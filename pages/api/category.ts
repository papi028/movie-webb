import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosLoklok from "configs/axiosLoklok";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { PATH_API } from "configs/path.api";

const searchWithCategoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const {
    area = "",
    category = 1,
    order = "up",
    size = 12,
    params = "",
    sort = "",
    subtitles = "",
    year = "",
  } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.post(PATH_API.searchWithCategory, {
    area,
    order,
    category,
    params,
    size,
    sort,
    subtitles,
    year,
  });
  const { data: filters } = await axiosLoklok(PATH_API.genres);
  const response = {
    message: "Get search by category successfully!",
    data: { filters, results: data.searchResults },
  };
  responseSuccess(res, response);
};

export default catchAsync(searchWithCategoryApi);
