import { IEpisode } from "@types";
import axiosClient from "configs/axiosClient";
import { server } from "configs/server";
import useSaveHistoryView from "hooks/useSaveHistoryView";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { MediaPlayer } from "modules/MediaPlayer";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { WatchAnthology } from "modules/WatchAnthology";
import { WatchCategory } from "modules/WatchCategory";
import { WatchMeta } from "modules/WatchMeta";
import { WatchSummary } from "modules/WatchSummary";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import styles from "styles/watch.module.scss";
import classNames from "utils/classNames";

interface WatchMoviePageProps {
  data: IEpisode;
}

const WatchMoviePage = ({ data }: WatchMoviePageProps) => {
  useSaveHistoryView(data);
  return (
    <LayoutPrimary>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.layoutMain}>
            <MediaPlayer
              qualities={data.qualities}
              subtitles={data.subtitles}
              poster={data.coverHorizontalUrl}
            />
            <h1 className={styles.heading}>
              {data.name} {data.currentEpName && data.currentEpName}
            </h1>
            <WatchMeta
              areaList={data.areaList}
              currentEpisode={data.currentEpisode}
              episodeCount={data.episodeCount}
              year={data.year}
              score={data.score}
            />
            <WatchCategory categories={data.tagList} />
            <WatchSummary introduction={data.introduction} />
          </div>
          <div className={classNames(styles.layoutSidebar, "scrollbar")}>
            <WatchAnthology detailMovie={data} />
          </div>
        </div>
        <MovieList heading="You may like">
          {data.likeList.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.name}
              poster={movie.coverVerticalUrl}
              domainType={movie.category}
            />
          ))}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category as string;
  const episode = params?.episode as string;
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`${server}/api/episode/`, {
      params: { category, id, episode },
    });
    return {
      props: { data },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true,
    };
  }
};

export default WatchMoviePage;
