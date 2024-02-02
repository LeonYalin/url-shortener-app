import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";

async function getLinkById(req: Request, res: Response) {
  const isNew = req.params.id === "0";
  if (isNew) {
    res.render("link_details", {
      link: {},
    });
  } else {
    const link = await Link.findById(req.params.id).exec();
    if (!link) {
      throw new Error("Invalid link ID");
    }
    res.render("link_details", {
      link,
    });
  }
}

async function submitLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("link_details", {
      link: {},
      errors: errors.array(),
    });
  } else {
    const link = Link.build(req.body.original);
    await link.save();
    res.redirect("/");
  }
}

export default {
  getLinkById,
  submitLink,
};
