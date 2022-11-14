import { IHomeSection } from "@types";
import axiosClient from "configs/axiosClient";
import useSWRInfinite from "swr/infinite";

const fetcherHomeSections = async (key: string) => {
  try {
    const page = Number(key.split("-").slice(-1)[0]);
    const { data } = await axiosClient.get("/api/home", { params: { page } });
    return data.homeSections;
  } catch (error) {
    return error;
  }
};

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 1}`;
  const { data, error, setSize, ...rest } = useSWRInfinite(
    getKey,
    (key) => fetcherHomeSections(key),
    { revalidateFirstPage: false }
  );
  const hasNextPage = data && !error && data?.slice(-1)?.[0]?.length !== 0;
  return {
    data: data?.reduce((acc, current) => [...acc, ...current], [] as IHomeSection[]) || [],
    error,
    setSize,
    hasNextPage,
    ...rest,
  };
};

export default useFetchHome;
