export const resizeImage = (url: string, width = 0, height = width) => {
  const baseURL = "https://images.weserv.nl/?url=";
  return `${baseURL}${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;
};
export const userRole = {
  USER: "USER",
  MOD: "MOD",
  ADMIN: "ADMIN",
};
export const userStatus = {
  ACTIVE: "ACTIVE",
  WARNING: "WARNING",
  BANNED: "BANNED",
};
export const commentStatus = {
  APPROVED: "APPROVED",
  WARNING: "WARNING",
  BANNED: "BANNED",
};
