import { nanoid } from "nanoid";

const basePath = "/s/";

function generateShortUrl() {
  return `${basePath}${nanoid(8)}`;
}

function getShortUrlPathById(id: string) {
  return `${basePath}${id}`;
}

export default {
  generateShortUrl,
  getShortUrlPathById,
};
