import { IHistoryView } from "@types";
import { WrapLink } from "components/WrapLink";
import { PATH } from "constants/path";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { MovieTitle } from "modules/MovieTitle";
import { Image } from "components/Image";
import { useEffect, useState } from "react";
import styles from "styles/history.module.scss";
import { Meta } from "components/Meta";
import { IconEmptyHistory, IconTrash } from "components/Icons";

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<IHistoryView[]>([]);
  const handleClearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };
  useEffect(() => {
    const historyLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(historyLocalStorage);
    setLoading(false);
  }, []);
  return (
    <LayoutPrimary>
      <Meta title="History - NetFilm" />
      <div className="container">
        {loading ? (
          <MovieListSkeleton count={6} />
        ) : (
          <>
            <div className={styles.header}>
              <h2>Watch history</h2>
              <button className={styles.cleanHistory} onClick={handleClearHistory}>
                <IconTrash width={12} height={12} />
                Clear history
              </button>
            </div>
            {history.length > 0 && (
              <div className="history-list">
                {history.map((movie) => {
                  const href = `${PATH.watch}/${movie.category}/${movie.id}`;
                  return (
                    <div className={styles.movieCard} key={movie.key}>
                      <WrapLink href={href} className={styles.movieCardMedia}>
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
                      </WrapLink>
                      <MovieTitle href={href} className={styles.movieCardTitle}>
                        {movie.name} {movie.currentEpName && `- ${movie.currentEpName}`}
                      </MovieTitle>
                    </div>
                  );
                })}
              </div>
            )}
            {history.length === 0 && (
              <div className="section-empty">
                <IconEmptyHistory />
                <span>No watch history found</span>
              </div>
            )}
          </>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default HistoryPage;
