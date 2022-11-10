import { IMovieSearch } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutHome } from "layouts/LayoutHome";
import { MovieCard } from "modules/MovieCard";
import { MovieList } from "modules/MovieList";
import { GetServerSidePropsContext } from "next";

interface SearchPageProps {
  keyword: string;
  results: IMovieSearch[];
}

const SearchPage = ({ results, keyword }: SearchPageProps) => {
  return (
    <LayoutHome>
      <div className="container">
        <MovieList heading={`Keyword: ${keyword}`}>
          {results.map((result) => (
            <MovieCard
              id={result.id}
              key={result.id}
              title={result.name}
              domainType={result.domainType}
              coverVerticalUrl={result.coverVerticalUrl}
            />
          ))}
        </MovieList>
      </div>
    </LayoutHome>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get("/api/search", { params: query });
  return {
    props: {
      results: data.results,
      keyword: data.keyword,
    },
  };
};

export default SearchPage;
