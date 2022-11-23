import { IMovieCard } from "@types";
import { CustomLink } from "components/CustomLink";
import { ImageLazyLoad } from "components/Image";
import { IMAGE_CARD_SIZE, resizeImageLoklok } from "constants/global";
import { PATH } from "constants/path";
import { MovieTitle } from "modules/MovieTitle";
import styles from "./movieCard.module.scss";

const MovieCard = ({ id, domainType, title, poster }: IMovieCard) => {
  const href = `${PATH.watch}/${domainType}/${id}`;
  return (
    <div className={styles.movieCard}>
      <CustomLink href={href} className={styles.movieCardMedia}>
        <ImageLazyLoad
          width={IMAGE_CARD_SIZE[0].width}
          height={IMAGE_CARD_SIZE[0].height}
          src={resizeImageLoklok(poster, IMAGE_CARD_SIZE[0].width, IMAGE_CARD_SIZE[0].height)}
          alt={title}
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
