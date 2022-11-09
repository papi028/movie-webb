import { IResponseHome } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import axiosApi from "configs/axiosApi";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const HomePageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 1 } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const {
    page: currentPage,
    recommendItems,
    searchKeyWord,
  }: IResponseHome = (await axiosApi(PATH_API.home, { params: { page } })).data;
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
      homeSections,
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
  let banners: any[] = [];
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
    banners.push({ id: Number(id), imageUrl, title });
  });
  return banners;
}

export default catchAsync(HomePageApi);

/** Lấy dữ liệu trang home
 * @swagger
 * /home:
 *  get:
 *      summary: Lấy dữ liệu trang home
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
