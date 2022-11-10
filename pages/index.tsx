import { IBanner, IHomeSection } from "@types";
import axios from "axios";
import { server } from "configs/server";
import { LayoutHome } from "layouts/LayoutHome";
import { HomeBanner } from "modules/HomeBanner";
import { HomeSection } from "modules/HomeSection";
import { GetServerSidePropsContext } from "next";

interface HomePageProps {
  banners: IBanner[];
  homeSections: IHomeSection[];
}

const HomePage = ({ banners, homeSections }: HomePageProps) => {
  return (
    <LayoutHome>
      <HomeBanner banners={banners} />
      {homeSections.map((homeSection) => (
        <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
      ))}
    </LayoutHome>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/home`)).data;
  return {
    props: {
      banners: data.banners,
      homeSections: data.homeSections,
    },
  };
};

export default HomePage;
