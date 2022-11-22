import { LayoutPrimary } from "layouts/LayoutPrimary";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { useAppSelector } from "store/global-store";

const FollowPage = () => {
  const { follows } = useAppSelector((state) => state.follow);
  return (
    <LayoutPrimary>
      <div className="container">
        <MovieList>
          {follows.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              domainType={movie.domainType}
              poster={movie.poster}
            />
          ))}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export default FollowPage;
