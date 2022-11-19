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
  initialVideos: IDiscovery[];
}

const DiscoveryPage = ({ initialVideos }: DiscoveryPageProps) => {
  const getKey = (index: number) => `/api/discovery?page=${index + 1}`;
  const {
    data: videos,
    error,
    setSize,
  } = useSWRInfinite(
    getKey,
    async (key: string) => {
      const { data } = await axiosClient.get(key);
      return data;
    },
    { revalidateFirstPage: false }
  );
  const isReachingEnd = videos?.[videos.length - 1]?.length === 0;
  const hasNextPage = videos && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="wrapper">
          {initialVideos.map((video) => (
            <DiscoveryCard key={video.id} info={video} />
          ))}
          {videos?.flat().map((video) => (
            <DiscoveryCard key={video.id} info={video} />
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
      initialVideos: data,
    },
  };
};

export default DiscoveryPage;
