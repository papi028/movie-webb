import { IBanner, IHomeSection } from "@types";
import { Meta } from "components/Meta";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { HomeBanner } from "modules/HomeBanner";
import { HomeSection } from "modules/HomeSection";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSidePropsContext } from "next";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface HomePageProps {
  banners: IBanner[];
  initialHomeSections: IHomeSection[];
}

const HomePage = ({ banners, initialHomeSections }: HomePageProps) => {
  const getApiUrl = (index: number) => `/api/home?page=${index + 1}`;
  const {
    data: homeSections,
    error,
    setSize,
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data.homeSections;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = homeSections?.[homeSections.length - 1]?.length === 0;
  const hasNextPage = homeSections && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <Meta />
      <div className="container">
        <HomeBanner banners={banners} />
        {initialHomeSections.map((homeSection) => (
          <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
        ))}
        {homeSections?.flat()?.map((homeSection: IHomeSection) => (
          <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
        ))}
        {hasNextPage && (
          <CheckInView onInView={handleLoadMore}>
            <MovieListSkeleton hasHeading />
          </CheckInView>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/home`, { params: query });
  return {
    props: {
      banners: data.banners,
      initialHomeSections: data.homeSections,
    },
  };
};

export default HomePage;
