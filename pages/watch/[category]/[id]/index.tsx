import { IEpisode } from "@types";
import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import { WatchPage } from "modules/WatchPage";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`/api/episode`, {
      params: { category, id }
    });
    return {
      props: { data },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: {},
      revalidate: REVALIDATE_TIME.fail,
      notFound: true
    };
  }
};

export default WatchTVPage;
