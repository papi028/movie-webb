import { IDiscovery } from "@types";
import axiosClient from "configs/axiosClient";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { DiscoveryCard } from "modules/DiscoveryCard";
import { GetServerSidePropsContext } from "next";

interface DiscoveryPageProps {
  discovery: IDiscovery[];
}

const DiscoveryPage = ({ discovery }: DiscoveryPageProps) => {
  console.log("discovery: ", discovery);
  return (
    <LayoutPrimary>
      <div className="container">
        <div className="wrapper">
          {discovery.map((item) => (
            <DiscoveryCard key={item.id} discovery={item} />
          ))}
        </div>
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
