import axiosClient from "configs/axiosClient";
import useSWRInfinite from "swr/infinite";

const fetcher = async (key: string) => {
  try {
    const { data } = await axiosClient.get("/api/home?page=" + Number(key.split("-").slice(-1)[0]));
    console.log("data: ", data);
    return data.homeSections;
  } catch (error) {
    return error;
  }
};

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 1}`;
  const { data, error, setSize, ...rest } = useSWRInfinite(getKey, (key) => fetcher(key), {
    revalidateFirstPage: false,
  });

  const hasNextPage = data && !error && data?.slice(-1)?.[0]?.length !== 0;

  return {
    data: data?.reduce((acc, current) => [...acc, ...current], []) || [],
    error,
    setSize,
    hasNextPage,
    ...rest,
  };
};

export default useFetchHome;
