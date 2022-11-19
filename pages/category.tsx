import { ICategoryResult, IFilter } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckLoadMore } from "modules/CheckLoadMore";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface CategoryPageProps {
  filters: IFilter[];
  results: ICategoryResult[];
}

const CategoryPage = ({ filters, results }: CategoryPageProps) => {
  const { query } = useRouter();
  const { category } = query;
  const nameCategory = filters[0]?.screeningItems
    .find((item) => item.id === 5)
    ?.items.find((cate) => cate.params === category)?.name;
  const getApiUrl = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    const apiURL = `/api/category?${queryString.stringify({ category, sort })}`;
    return apiURL;
  };
  const {
    data: movies,
    setSize,
    error,
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data.results;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = movies?.[movies.length - 1]?.length === 0;
  const hasNextPage = movies && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <h3>{nameCategory}</h3>
        {(movies?.flat()?.length as number) > 0 ? (
          <MovieList>
            {movies?.flat()?.map((result: ICategoryResult) => (
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
          <CheckLoadMore onLoadMore={handleLoadMore}>
            <MovieListSkeleton />
          </CheckLoadMore>
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
