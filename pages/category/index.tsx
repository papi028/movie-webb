import { ICategoryResult, IFilter, IFilterOptionItem, IFilterOptions } from "@types";
import { Dropdown } from "components/Dropdown";
import axiosClient from "configs/axiosClient";
import useFetchCategory from "hooks/useFetchCategory";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";

interface CategoryPageProps {
  filters: IFilter[];
  results: ICategoryResult[];
}

const CategoryPage = ({ filters, results }: CategoryPageProps) => {
  const [movies, setMovies] = useState(results);
  const { data: moreCategories, setSize, hasNextPage } = useFetchCategory();
  const [params, setParams] = useState({
    area: "",
    category: 1,
    order: "up",
    size: 12,
    params: filters[0].params,
    sort: "",
    subtitles: "",
    year: "",
  });
  const [options, setOptions] = useState<IFilterOptions[]>(filters[0].screeningItems);
  const handleInview = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  const handleClickOption = (option: IFilterOptionItem) => {
    setParams({ ...params, [option.screeningType]: option.params });
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axiosClient.get("/api/category", { params });
        setMovies(data.results);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchMovies();
  }, [params]);
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="movie-list mt-20">
          <Dropdown placeholder="All type">
            <Dropdown.Select />
            <Dropdown.List>
              {filters.length > 0 &&
                filters.map((filter: IFilter) => (
                  <Dropdown.Option
                    key={filter.id}
                    handleClickOption={(e, setTitle) => {
                      setTitle(filter.name);
                      setParams({ ...params, params: filter.params });
                      setOptions(filter.screeningItems);
                    }}
                  >
                    {filter.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>
          {options.map((option, index) => (
            <Dropdown placeholder={option.id ? option.name : option.items[0].name} key={index}>
              <Dropdown.Select />
              <Dropdown.List>
                {option.items.length > 0 &&
                  option.items.map((item) => (
                    <Dropdown.Option
                      key={item.params}
                      handleClickOption={(e, setTitle) => {
                        setTitle(item.name);
                        setParams({ ...params, [item.screeningType]: item.params });
                      }}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          ))}
        </div>
        <MovieList>
          {movies.map((result) => (
            <MovieCard
              key={result.id}
              id={result.id}
              title={result.name}
              domainType={result.domainType}
              poster={result.coverVerticalUrl}
            />
          ))}
          {moreCategories.map((result: ICategoryResult) => (
            <MovieCard
              key={result.id}
              id={result.id}
              title={result.name}
              domainType={result.domainType}
              poster={result.coverVerticalUrl}
            />
          ))}
        </MovieList>
        {hasNextPage && (
          <CheckInView onInView={handleInview}>
            <MovieListSkeleton />
          </CheckInView>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/category`, { params: query });
  return {
    props: {
      filters: data.filters,
      results: data.results,
    },
  };
};

export default CategoryPage;
