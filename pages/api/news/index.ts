import axios from "axios";
import * as cheerio from "cheerio";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const NewsApi = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const response = await axios.get("https://loklok.com/articles");
  const html = response.data;
  const $ = cheerio.load(html);
  let articles: any[] = [];
  let scriptStr = $("#__nuxt + script").text();
  scriptStr = scriptStr.slice(scriptStr.indexOf("articleList") + 12, scriptStr.indexOf(",fetch:{"));
  scriptStr = scriptStr.replace(/[\[\]]/g, "");
  scriptStr = scriptStr.replace(/\\u002F/g, "\u002F");
  const arrayData = scriptStr.split("},");
  arrayData.forEach((str, index) => {
    const item = arrayData[index];
    const id = item.slice(item.indexOf("id:") + 3, getPosition(item, ",", 3));
    const imageUrl = item
      .slice(item.indexOf("coverImg:") + 9, getPosition(str, ",", 1))
      .replace(/[\"]/g, "");
    const title = item
      .slice(item.indexOf("title:") + 7, str.lastIndexOf(`"`))
      .replace(/[\\\"]/g, "");
    articles.push({ id: Number(id), imageUrl, title });
  });
  return articles;
};

export default catchAsync(NewsApi);

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
