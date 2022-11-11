import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosLoklok from "configs/axiosLoklok";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { PATH_API } from "configs/path.api";

const searchWithCategoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { category = 1, size = 14, params = "", sort = "" } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.post(PATH_API.searchWithCategory, {
    category,
    params,
    size,
    sort,
  });
  const results = data.searchResults;
  const response = {
    message: "Get search by category successfully!",
    data: { results },
  };
  responseSuccess(res, response);
};

export default catchAsync(searchWithCategoryApi);
