import { IBanner, IHomeSection } from "@types";
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
  homeSections: IHomeSection[];
}

const HomePage = ({ banners, homeSections }: HomePageProps) => {
  const getKey = (index: number) => `home-${index || 1}`;
  const { data, error, setSize } = useSWRInfinite(
    getKey,
    async (key: string) => {
      const page = Number(key.split("-").slice(-1)[0]);
      const { data } = await axiosClient.get("/api/home", { params: { page } });
      return data.homeSections;
    },
    { revalidateFirstPage: false }
  );
  const isReachingEnd = data?.[data.length - 1]?.length === 0;
  const hasNextPage = data && !error && !isReachingEnd;
  const handleInview = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <HomeBanner banners={banners} />
        {homeSections.map((homeSection) => (
          <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
        ))}
        {data?.flat()?.map((homeSection: IHomeSection) => (
          <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
        ))}
        {hasNextPage && (
          <CheckInView onInView={handleInview}>
            <div className="container">
              <MovieListSkeleton hasHeading />
            </div>
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
      homeSections: data.homeSections,
    },
  };
};

export default HomePage;
