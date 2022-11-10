import { CustomLink } from "components/CustomLink";
import { resizeImage } from "constants/global";
import { PATH } from "constants/path";
import { MovieTitle } from "modules/MovieTitle";
import Image from "next/image";
import styles from "./movieCard.module.scss";

const MovieCard = ({
  id,
  domainType,
  title,
  coverVerticalUrl,
}: {
  id: string;
  title: string;
  domainType: number;
  coverVerticalUrl: string;
}) => {
  const href = `${PATH.detail}/${domainType}/${id}`;
  return (
    <div className={styles.movieCard}>
      <CustomLink href={href} className={styles.movieCardMedia}>
        <Image
          alt={title}
          width={190}
          height={266}
          src={coverVerticalUrl}
          className={styles.movieCardPoster}
        />
        <picture>
          <img src="/icon-play.png" alt="play" className={styles.movieCardPlay} />
        </picture>
      </CustomLink>
      <MovieTitle href={href} className={styles.movieCardTitle}>
        {title}
      </MovieTitle>
    </div>
  );
};

export default MovieCard;
