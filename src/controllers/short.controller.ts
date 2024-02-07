import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import urlService from "../services/url.helper";
import { BadRequestError } from "../errors/bad_request.error";
import { logger } from "../services/logger";

async function getShortById(req: Request, res: Response) {
  const short = urlService.getShortUrlPathById(req.params.id);
  const link = await Link.findOne({ short });
  if (!link) {
    throw new BadRequestError("Invalid request");
  }

  logger.info(`ShortController__getShortById
  - result: ${JSON.stringify(link, null, 6)}`);

  res.redirect(link.original);
}

export default {
  getShortById,
};
