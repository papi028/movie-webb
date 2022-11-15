import { ICategoryResult, IFilter, IFilterOptions } from "@types";
import { Dropdown } from "components/Dropdown";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { MovieListSkeleton, MovieSkeleton } from "modules/MovieSkeleton";
import { GetServerSidePropsContext } from "next";
import { useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";

interface CategoryPageProps {
  filters: IFilter[];
  results: ICategoryResult[];
}

const CategoryPage = ({ filters, results }: CategoryPageProps) => {
  const [options, setOptions] = useState<IFilterOptions[]>(filters[0].screeningItems);
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
  const getSortKey = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    return `${JSON.stringify(params)}explore-${sort}`;
  };
  const { data, setSize, error } = useSWRInfinite(
    getSortKey,
    async (key: string) => {
      const sort = key.split("explore-")[1];
      const { data } = await axiosClient.get("/api/category", { params: { ...params, sort } });
      return data.results;
    },
    { revalidateFirstPage: false }
  );
  const isReachingEnd = data?.[data.length - 1]?.length === 0;
  const hasNextPage = data && !error && !isReachingEnd;
  const movies = data?.flat();
  const handleInview = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
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
        {(movies?.length as number) > 0 ? (
          <MovieList>
            {movies?.map((result: ICategoryResult) => (
              <MovieCard
                key={result.id}
                id={result.id}
                title={result.name}
                domainType={result.domainType}
                poster={result.coverVerticalUrl}
              />
            ))}
          </MovieList>
        ) : (
          <MovieListSkeleton count={12} />
        )}
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
