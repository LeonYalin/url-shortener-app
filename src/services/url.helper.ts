import { Request } from "express";
import { nanoid } from "nanoid";

const basePath = "/s/";

function generateShortUrl() {
  return `${basePath}${nanoid(8)}`;
}

function getShortUrlPathById(id: string) {
  return `${basePath}${id}`;
}

function getCacheKey(
  req: Request,
  { customUrl = "", removeMethodSuffix = false } = {}
) {
  let url = customUrl || req.originalUrl || req.url;
  if (removeMethodSuffix) {
    url = url.replace(/\?_method=(PUT|DELETE)/i, "");
  }
  return `__express__${url}`;
}

export default {
  generateShortUrl,
  getShortUrlPathById,
  getCacheKey,
};
