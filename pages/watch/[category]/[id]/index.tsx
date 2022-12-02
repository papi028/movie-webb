import { IEpisode } from "@types";
import axiosClient from "configs/axiosClient";
import { WatchPage } from "modules/WatchPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

interface WatchTVPageProps {
  data: IEpisode;
}

const WatchTVPage = ({ data }: WatchTVPageProps) => {
  return <WatchPage data={data} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category as string;
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`/api/episode/`, {
      params: { category, id }
    });
    return {
      props: { data },
      revalidate: 300
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true
    };
  }
};

export default WatchTVPage;
