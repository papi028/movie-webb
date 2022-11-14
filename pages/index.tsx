import { IBanner, IHomeSection } from "@types";
import axiosClient from "configs/axiosClient";
import useFetchHome from "hooks/useFetchHome";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckInView } from "modules/CheckInView";
import { HomeBanner } from "modules/HomeBanner";
import { HomeSection } from "modules/HomeSection";
import { GetServerSidePropsContext } from "next";
import { useCallback } from "react";

interface HomePageProps {
  banners: IBanner[];
  homeSections: IHomeSection[];
}

const HomePage = ({ banners, homeSections }: HomePageProps) => {
  const { data: dataCSR, setSize, hasNextPage } = useFetchHome();
  console.log("dataCSR: ", dataCSR);
  const handleInview = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <HomeBanner banners={banners} />
      {homeSections.map((homeSection) => (
        <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
      ))}
      {dataCSR.map((homeSection: any) => (
        <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
      ))}
      {hasNextPage && (
        <CheckInView onInView={handleInview}>
          <div>Skeleton</div>
        </CheckInView>
      )}
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
