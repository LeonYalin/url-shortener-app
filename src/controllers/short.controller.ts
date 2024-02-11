import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import urlService from "../services/url.helper";
import { BadRequestError } from "../errors/bad_request.error";
import { logger } from "../services/logger";
import { cache } from "../services/cache";
import urlHelper from "../services/url.helper";

async function getShortById(req: Request, res: Response) {
  const cachedData = req.session.cachedData;
  if (cachedData) {
    const linkOriginal = cachedData as string;
    req.session.cachedData = undefined;
    return res.redirect(linkOriginal);
  }

  const short = urlService.getShortUrlPathById(req.params.id);
  const link = await Link.findOne({ short });
  if (!link) {
    throw new BadRequestError("Invalid request");
  }

  logger.info(`ShortController__getShortById
  - result: ${JSON.stringify(link, null, 6)}`);

  cache.set(urlHelper.getCacheKey(req), link.original);
  res.redirect(link.original);
}

export default {
  getShortById,
};
