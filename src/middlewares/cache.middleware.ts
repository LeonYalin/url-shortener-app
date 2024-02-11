import { NextFunction, Request, Response } from "express";
import { cache } from "../services/cache";
import { DbConnectionError } from "../errors/db_connection.error";
import urlHelper from "../services/url.helper";

export async function cacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cacheKey = urlHelper.getCacheKey(req);
  try {
    if (req.session.nocache) {
      req.session.cachedData = undefined;
      req.session.nocache = undefined;
      return next();
    }
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      console.warn("from cache!", cacheKey);
      req.session.cachedData = cachedData;
    }
    next();
  } catch (e) {
    throw new DbConnectionError("Error connecting to Redis");
  }
}
