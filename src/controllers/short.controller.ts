import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import urlService from "../services/url.service";

async function getShortById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send("Invalid URL");
  } else {
    const short = urlService.getShortUrlPathById(req.params.id);
    const link = await Link.findOne({ short });
    if (!link) {
      throw new Error("Link not found in DB");
    }
    res.redirect(link.original);
  }
}

export default {
  getShortById,
};
