import { IEpisode } from "@types";
import axios from "axios";
import { server } from "configs/server";
import { LayoutHome } from "layouts/LayoutHome";
import { MediaPlayer } from "modules/MediaPlayer";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { WatchAnthology } from "modules/WatchAnthology";
import { WatchCategory } from "modules/WatchCategory";
import { WatchMeta } from "modules/WatchMeta";
import { WatchSummary } from "modules/WatchSummary";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRef } from "react";
import styles from "styles/watch.module.scss";

interface WatchPageProps {
  data: IEpisode;
}

const WatchPage = ({ data }: WatchPageProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  return (
    <LayoutHome>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.box1}>
            <MediaPlayer
              playerRef={playerRef}
              qualities={data.qualities}
              subtitles={data.subtitles}
            />
            <h1 className={styles.heading}>
              {data.name} {data.currentEpName && `- Ep ${data.currentEpName}`}
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
          <div className={styles.box2}>
            <WatchAnthology detailMovie={data} />
          </div>
        </div>
        <MovieList heading="You may like">
          {data.likeList.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.name}
              coverVerticalUrl={movie.coverVerticalUrl}
              domainType={movie.category}
            />
          ))}
        </MovieList>
      </div>
    </LayoutHome>
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
    const { data } = await axios.get(`${server}/api/episode/`, {
      params: { category, id, episode },
    });
    return {
      props: { data: data.data },
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

export default WatchPage;
