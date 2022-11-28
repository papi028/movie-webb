import { IStarInfo } from "@types";
import { TextToggleMore } from "components/Text";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { GetServerSidePropsContext } from "next";
import { Image } from "components/Image";
import styles from "styles/star.module.scss";
import { Meta } from "components/Meta";

interface StarInfoPageProps {
  data: IStarInfo;
}

const StarInfoPage = ({ data }: StarInfoPageProps) => {
  return (
    <>
      <Meta title={`${data.localName} - NetFilm`} />
      <LayoutPrimary>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.avatar}>
              <Image src={data.bgPhotos} width={150} height={150} alt={data.localName} />
            </div>
            <div className={styles.info}>
              <h1>{data.localName}</h1>
              <TextToggleMore countLetter={500}>{data.introduction}</TextToggleMore>
            </div>
          </div>
          <MovieList>
            {data.dramaList.map((movie) => (
              <MovieCard
                key={movie.contentId}
                id={movie.contentId}
                domainType={movie.category}
                poster={movie.coverVerticalUrl}
                title={movie.name}
              />
            ))}
            {data.movieList.map((movie) => (
              <MovieCard
                key={movie.contentId}
                id={movie.contentId}
                domainType={movie.category}
                poster={movie.coverVerticalUrl}
                title={movie.name}
              />
            ))}
          </MovieList>
        </div>
      </LayoutPrimary>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/star`, { params: query });
  return {
    props: {
      data
    }
  };
};

export default StarInfoPage;
