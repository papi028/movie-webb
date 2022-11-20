import axiosLoklokSub from "configs/axiosLoklokSub";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const NewsDetailsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id = 0 } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklokSub(PATH_API.newsDetail, { params: { id } });
  const response = {
    message: "Get news details successfully!",
    data: data,
  };
  responseSuccess(res, response);
};

export default catchAsync(NewsDetailsApi);
