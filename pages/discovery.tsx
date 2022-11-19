import { IDiscovery } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { CheckLoadMore } from "modules/CheckLoadMore";
import { DiscoveryCard } from "modules/DiscoveryCard";
import { GetServerSidePropsContext } from "next";

interface DiscoveryPageProps {
  discovery: IDiscovery[];
}

const DiscoveryPage = ({ discovery }: DiscoveryPageProps) => {
  const handleInview = () => {
    console.log("In view");
  };
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="wrapper">
          {discovery.map((item) => (
            <DiscoveryCard key={item.id} discovery={item} />
          ))}
        </div>
        <CheckLoadMore onLoadMore={handleInview}>Load more</CheckLoadMore>
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axiosClient.get(`/api/discovery`, { params: query });
  return {
    props: {
      discovery: data,
    },
  };
};

export default DiscoveryPage;
