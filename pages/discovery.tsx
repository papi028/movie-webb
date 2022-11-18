import axiosLoklok from "configs/axiosLoklok";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import useSWRInfinite from "swr/infinite";

export const getPreviewVideoMedia = async (page: number) => {
  try {
    const { data }: any = await axiosLoklok.get(
      `${URL}/recommendPool/getVideoFromRecommondPool?page=${page}`
    );
    const requestMedia = data.map((item: any) => {
      const { definitionList } = item.mediaInfo;
      const definition = definitionList[definitionList.length - 1]?.code;
      return {
        contentId: item.id,
        episodeId: item.mediaInfo.id,
        category: item.category,
        definition,
      };
    });
    const response: any = await axiosLoklok.post(`${URL}/media/bathGetplayInfo`, requestMedia);
    const community = data.map((item: any, index: number) => {
      return {
        ...item,
        mediaInfoUrl: response.data[index],
      };
    });
    return community;
  } catch (error) {
    return error;
  }
};

const DiscoveryPage = () => {
  const getKey = (index: number) => `community-${index || 0}`;
  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key) => getPreviewVideoMedia(Number(key.split("community-").slice(-1)[0])),
    {
      revalidateFirstPage: false,
    }
  );
  console.log("data: ", data);
  return <LayoutPrimary>DiscoveryPage</LayoutPrimary>;
};

export default DiscoveryPage;
