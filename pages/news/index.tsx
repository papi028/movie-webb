import { INewsCard } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckLoadMore } from "modules/CheckLoadMore";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { NewsCard, NewsCardSkeleton } from "modules/NewsCard";
import { NewsList, NewsListSkeleton } from "modules/NewsList";
import { GetServerSidePropsContext } from "next";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface NewsPageProps {
  initialNews: INewsCard[];
}

const NewsPage = ({ initialNews }: NewsPageProps) => {
  const getApiUrl = (index: number) => `/api/news?page=${index + 1}`;
  const {
    data: news,
    error,
    setSize,
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data.list;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = news?.[news.length - 1]?.length === 0;
  const hasNextPage = news && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <NewsList>
          {initialNews.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              image={item.coverImg}
              title={item.title}
              introduction={item.introduction}
            />
          ))}
          {news?.flat().map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              image={item.coverImg}
              title={item.title}
              introduction={item.introduction}
            />
          ))}
        </NewsList>
        {hasNextPage && (
          <CheckLoadMore onLoadMore={handleLoadMore}>
            <NewsListSkeleton />
          </CheckLoadMore>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/news`, { params: query });
  return {
    props: {
      initialNews: data.list,
    },
  };
};

export default NewsPage;
