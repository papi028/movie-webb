import axios from "axios";
// @ts-ignore
import { Parser } from "m3u8-parser";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const DownloadVideoApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { url = "" } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  if (!url || typeof url !== "string") {
    const error = new ApiError(STATUS.BAD_REQUEST, "Missing url params");
    return responseError(error, res);
  }
  const { data: source, headers } = await axios.get(url);
  if (
    ![
      "audio/x-mpegurl",
      "video/m3u",
      "video/m3u8",
      "video/hls",
      "application/x-mpegurl",
      "vnd.apple.mpegurl",
      "video/mp2t",
      "application/vnd.apple.mpegurl",
    ].includes(headers["content-type"]?.toLowerCase() || "")
  ) {
    const error = new ApiError(STATUS.BAD_REQUEST, "File is not m3u8");
    return responseError(error, res);
  }
  const parser = new Parser();
  parser.push(source);
  parser.end();
  const manifest = parser.manifest;
  if (!manifest?.segments?.length && !manifest?.playlists?.length) {
    const error = new ApiError(STATUS.BAD_REQUEST, "Invalid m3u8");
    return responseError(error, res);
  }
  const response = {
    message: "Download video successfully !",
    data: parser.manifest,
  };
  responseSuccess(res, response);
};

export default catchAsync(DownloadVideoApi);
