import { IDiscovery } from "@types";
import { LoadingSpinner } from "components/Loading";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckLoadMore } from "modules/CheckLoadMore";
import { DiscoveryCard } from "modules/DiscoveryCard";
import { GetServerSidePropsContext } from "next";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface DiscoveryPageProps {
  discovery: IDiscovery[];
}

const DiscoveryPage = ({ discovery }: DiscoveryPageProps) => {
  const getKey = (index: number) => `/api/discovery?page=${index}`;
  const { data, error, setSize } = useSWRInfinite(
    getKey,
    async (key: string) => {
      const response = await axiosClient.get(key);
      return response.data;
    },
    { revalidateFirstPage: false }
  );
  const isReachingEnd = data?.[data.length - 1]?.length === 0;
  const hasNextPage = data && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="wrapper">
          {data?.flat().map((item) => (
            <DiscoveryCard key={item.id} discovery={item} />
          ))}
        </div>
        {hasNextPage && (
          <CheckLoadMore onLoadMore={handleLoadMore}>
            <LoadingSpinner />
          </CheckLoadMore>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/discovery`, { params: query });
  return {
    props: {
      discovery: data,
    },
  };
};

export default DiscoveryPage;
