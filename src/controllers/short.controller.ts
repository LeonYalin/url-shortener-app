import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import urlService from "../services/url.service";
import { BadRequestError } from "../errors/bad_request.error";

async function getShortById(req: Request, res: Response) {
  const short = urlService.getShortUrlPathById(req.params.id);
  const link = await Link.findOne({ short });
  if (!link) {
    throw new BadRequestError("Invalid request");
  }
  res.redirect(link.original);
}

export default {
  getShortById,
};
