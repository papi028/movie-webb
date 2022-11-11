import axios from "axios";
import * as cheerio from "cheerio";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const NewsDetailsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await getNews();

  const response = {
    message: "Get news successfully!",
    data,
  };
  responseSuccess(res, response);
};

function getPosition(string: string, subString: string, index: number) {
  return string.split(subString, index).join(subString).length;
}

const getNews = async () => {
  const response = await axios.get("https://loklok.com/article/653");
  const html = response.data;
  console.log("html: ", html);
  const $ = cheerio.load(html);
  let articles: any[] = [];
  let scriptStr = $("#__nuxt + script").text();
  scriptStr = scriptStr.slice(scriptStr.indexOf("content:") + 8, scriptStr.indexOf(",fetch:{"));
  scriptStr = scriptStr.replace(/[\[\]]/g, "");
  scriptStr = scriptStr.replace(/\\u002F/g, "\u002F");
  return scriptStr;
};

export default catchAsync(NewsDetailsApi);

/** Lấy dữ liệu trang news
 * @swagger
 * /news:
 *  get:
 *      summary: Lấy dữ liệu trang news
 *      tags: [News]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *      responses:
 *          200:
 *            description: Success
 */
