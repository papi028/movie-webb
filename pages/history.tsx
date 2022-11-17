import { IHistoryView } from "@types";
import { CustomLink } from "components/CustomLink";
import { PATH } from "constants/path";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { MovieTitle } from "modules/MovieTitle";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "styles/history.module.scss";

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<IHistoryView[]>([]);
  useEffect(() => {
    const historyLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(historyLocalStorage);
    setLoading(false);
  }, []);
  return (
    <LayoutPrimary>
      <div className="container mt-20">
        {loading ? (
          <MovieListSkeleton count={6} />
        ) : (
          <div className="history-list">
            {history.map((movie) => {
              const href = `${PATH.watch}/${movie.category}/${movie.id}`;
              return (
                <div className={styles.movieCard} key={movie.key}>
                  <CustomLink href={href} className={styles.movieCardMedia}>
                    <Image
                      alt={movie.name}
                      width={312}
                      height={175}
                      src={movie.coverHorizontalUrl}
                      className={styles.movieCardPoster}
                    />
                    <picture>
                      <img src="/icon-play.png" alt="play" className={styles.movieCardPlay} />
                    </picture>
                  </CustomLink>
                  <MovieTitle href={href} className={styles.movieCardTitle}>
                    {movie.name}
                  </MovieTitle>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default HistoryPage;
