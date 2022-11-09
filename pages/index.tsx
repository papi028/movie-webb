import axios from "axios";
import { server } from "configs/server";
import { LayoutHome } from "layouts/LayoutHome";
import { HomeBanner } from "modules/HomeBanner";
import { GetServerSidePropsContext } from "next";

interface HomePageProps {
  banners: any;
}

const HomePage = ({ banners }: HomePageProps) => {
  console.log("banners: ", banners);
  return (
    <LayoutHome>
      <HomeBanner banners={banners} />
    </LayoutHome>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/home`)).data;
  return {
    props: {
      banners: data.banners,
    },
  };
};

export default HomePage;
