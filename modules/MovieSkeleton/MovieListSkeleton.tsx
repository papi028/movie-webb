import React from "react";
import MovieSkeleton from "./MovieSkeleton";
import styles from "./movieSkeleton.module.scss";
import stylesMovieList from "../MovieList/movieList.module.scss";

interface MovieListSkeletonProps {
  count?: number;
}

const MovieListSkeleton = ({ count = 6 }: MovieListSkeletonProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.heading}></div>
      <div className={stylesMovieList.list}>
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
