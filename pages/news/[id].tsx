import { INewsDetails } from "@types";
import axiosClient from "configs/axiosClient";
import { PATH } from "constants/path";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useEffect } from "react";
import styles from "styles/news.module.scss";

interface NewsDetailsPageProps {
  news: INewsDetails;
}

const NewsDetailsPage = ({ news }: NewsDetailsPageProps) => {
  useEffect(() => {
    const links = document.getElementsByTagName("article")[0].getElementsByTagName("a");
    Array.from(links).forEach((link) => {
      const href = link.href;
      if (!href.startsWith("https://ga-mobile-api.loklok.tv")) return;
      const category = href.split("category=")[1];
      const id = href.slice(href.indexOf("id=") + 3, href.indexOf("&"));
      link.href = `${PATH.watch}/${category}/${id}`;
    });
  }, []);
  return (
    <LayoutPrimary>
      <div className="container">
        <article className={styles.article}>
          <h1 dangerouslySetInnerHTML={{ __html: news.title }} />
          <span className={styles.createTime}>
            Published At: {new Date(news.createTime).toLocaleDateString("vi-VI")}
          </span>
          <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
        </article>
      </div>
    </LayoutPrimary>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id as string;
  try {
    const { data } = await axiosClient.get(`/api/news/${id}`);
    return {
      props: { news: data },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true,
    };
  }
};

export default NewsDetailsPage;
