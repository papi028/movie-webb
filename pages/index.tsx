import { IBanner, IHomeSection } from "@types";
import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { HomeBanner } from "modules/HomeBanner";
import { HomeSection } from "modules/HomeSection";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetStaticProps } from "next";
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
    setSize
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

import { GetStaticProps } from 'next';
import axiosClient from 'configs/axiosClient';
import { REVALIDATE_TIME } from 'constants/global';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axiosClient.get(`/api/home`);
    
    if (!data || !data.banners || !data.homeSections) {
      throw new Error('Invalid data structure');
    }

    return {
      props: {
        banners: data.banners,
        initialHomeSections: data.homeSections,
      },
      revalidate: REVALIDATE_TIME.success,
    };
  } catch (error) {
    console.error('Error fetching home data:', (error as Error).message);
    return {
      props: {
        banners: [],
        initialHomeSections: [],
      },
      revalidate: REVALIDATE_TIME.error,
    };
  }
};



export default HomePage;
