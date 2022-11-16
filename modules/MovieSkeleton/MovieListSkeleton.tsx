import MovieSkeleton from "./MovieSkeleton";
import styles from "./movieSkeleton.module.scss";

interface MovieListSkeletonProps {
  hasHeading?: boolean;
  count?: number;
}

const MovieListSkeleton = ({ hasHeading = false, count = 6 }: MovieListSkeletonProps) => {
  return (
    <div className={styles.section}>
      {hasHeading && <div className={styles.heading}></div>}
      <div className="movie-list">
        {Array(count)
          .fill(0)
          .map((item, index) => (
            <MovieSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default MovieListSkeleton;
