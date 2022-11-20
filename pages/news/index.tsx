import { INewsCard } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { NewsCard } from "modules/NewsCard";
import { GetServerSidePropsContext } from "next";

interface NewsPageProps {
  news: INewsCard[];
}

const NewsPage = ({ news }: NewsPageProps) => {
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="news-list">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              image={item.coverImg}
              title={item.title}
              introduction={item.introduction}
            />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/news`, { params: query });
  return {
    props: {
      news: data.list,
    },
  };
};

export default NewsPage;
