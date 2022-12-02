import { IEpisode } from "@types";
import axiosClient from "configs/axiosClient";
import { WatchPage } from "modules/WatchPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

interface WatchMoviePageProps {
  data: IEpisode;
}

const WatchMoviePage = ({ data }: WatchMoviePageProps) => {
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
  const episode = params?.episode as string;
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`/api/episode/`, {
      params: { category, id, episode }
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

export default WatchMoviePage;
