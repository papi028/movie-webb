import { ICategoryResult, IFilter } from "@types";
import axiosClient from "configs/axiosClient";
import useFetchCategory from "hooks/useFetchCategory";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSidePropsContext } from "next";
import { useCallback } from "react";

interface CategoryPageProps {
  filters: IFilter[];
  results: ICategoryResult[];
}

const CategoryPage = ({ filters, results }: CategoryPageProps) => {
  const { data: moreCategories, setSize, hasNextPage } = useFetchCategory();
  const handleInview = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <MovieList>
          {results.map((result) => (
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
