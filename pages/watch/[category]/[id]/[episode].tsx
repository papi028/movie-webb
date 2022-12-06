import { IEpisode } from "@types";
import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import { WatchPage } from "modules/WatchPage";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const episode = params?.episode as string;
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`/api/episode`, {
      params: { category, id, episode }
    });
    return {
      props: { data },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: REVALIDATE_TIME.fail
    };
  }
};

export default WatchMoviePage;
