import { IBanner, IResponseHome } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const HomePageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0 } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const {
    page: currentPage,
    recommendItems,
    searchKeyWord,
  }: IResponseHome = (await axiosLoklok(PATH_API.home, { params: { page } })).data;
  const homeSections = recommendItems.filter(
    (section) => section.homeSectionType !== "BLOCK_GROUP" && section.homeSectionName !== ""
  );
  const banners = await getBanners();
  const response = {
    message: "Get home successfully!",
    data: {
      page: currentPage,
      banners,
      searchKeyWord,
      homeSections: homeSections.map((section) => ({
        ...section,
        homeSectionName: section.homeSectionName.replace("Loklok", "Netfilm"),
      })),
    },
  };
  responseSuccess(res, response);
};

function getPosition(string: string, subString: string, index: number) {
  return string.split(subString, index).join(subString).length;
}

async function getBanners() {
  const response = await axios.get(PATH_API.loklok);
  const html = response.data;
  const $ = cheerio.load(html);
  let banners: IBanner[] = [];
  let scriptStr = $("#__nuxt + script").text();
  scriptStr = scriptStr.slice(scriptStr.indexOf("banners:[") + 8, scriptStr.indexOf(",indexData:"));
  scriptStr = scriptStr.replace(/[\[\]]/g, "");
  scriptStr = scriptStr.replace(/\\u002F/g, "\u002F");
  const arrayData = scriptStr.split("},");
  $(".swiper-wrap .swiper-slide", html).each(function (index, element) {
    const item = arrayData[index];
    const id = item.slice(item.indexOf('jumpParam:"') + 11, getPosition(item, ",", 4) - 1);
    const imageUrl = item.slice(item.indexOf("imgUrl:") + 8, item.indexOf('",'));
    const title = $(element).find(".footer-shadow").text();
    const jumpType = item.slice(item.indexOf("jumpType:") + 9, item.indexOf("jumpType:") + 10);
    banners.push({ id: Number(id), imageUrl, title, jumpType: jumpType === "d" ? 1 : 0 });
  });
  return banners;
}

export default catchAsync(HomePageApi);

/** Get data homepage
 * @swagger
 * /home:
 *  get:
 *      summary: Get data homepage
 *      tags: [Home]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *      responses:
 *          200:
 *            description: Success
 */
