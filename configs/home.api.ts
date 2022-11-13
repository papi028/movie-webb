import axiosLoklok from "./axiosLoklok";

export const getHome = async (page: number = 0) =>
  (
    await axiosLoklok.get("homePage/getHome", {
      params: {
        page,
      },
    })
  ).data?.recommendItems.filter(
    (item: { bannerProportion: any }, i: number) => i === 0 || !item.bannerProportion
  );
