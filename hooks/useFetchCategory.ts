import { ICategoryResult } from "@types";
import axiosClient from "configs/axiosClient";
import useSWRInfinite from "swr/infinite";

const COUNT_FIRST_FETCH = 12;

const useFetchCategory = () => {
  const getCategorySortKey = (index: number, prevResults: ICategoryResult[] | null) => {
    const isEmpty = prevResults?.length === 0;
    if (isEmpty) return null;
    const sort = prevResults?.[prevResults.length - 1]?.sort || "";
    return `category-${sort}`;
  };
  const { data, size, setSize, error } = useSWRInfinite(
    getCategorySortKey,
    async (key) => {
      const sort = key.split("category-")[1];
      const { data } = await axiosClient.get("/api/category", { params: { sort } });
      return data.results;
    },
    { revalidateFirstPage: false } // set false to not called first fetcher api
  );
  const isReachingEnd = data?.[data.length - 1]?.length === 0;
  const hasNextPage = data && !error && !isReachingEnd;
  return {
    data: data?.flat()?.slice(COUNT_FIRST_FETCH) || [],
    size,
    setSize,
    error,
    isReachingEnd,
    hasNextPage,
  };
};

export default useFetchCategory;
