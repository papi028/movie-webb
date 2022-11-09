import axios from "axios";
import { server } from "configs/server";
import { GetServerSidePropsContext } from "next";

interface HomePageProps {
  banners: any;
}

const HomePage = ({ banners }: HomePageProps) => {
  console.log("banners: ", banners);
  return <>test</>;
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
