export const resizeImage = (url: string, width = 0, height = width) => {
  const baseURL = "https://images.weserv.nl/?url=";
  return `${baseURL}${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;
};
export const defaultAvatar =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
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
