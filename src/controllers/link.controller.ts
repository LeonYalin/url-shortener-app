import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import { BadRequestError } from "../errors/bad_request.error";

async function getLinkById(req: Request, res: Response) {
  const isNew = req.params.id === "0";
  if (isNew) {
    res.render("link_details", {
      link: {},
    });
  } else {
    const link = await Link.findById(req.params.id).exec();
    if (!link) {
      throw new BadRequestError("Invalid request");
    }
    res.render("link_details", {
      link,
    });
  }
}

async function createLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("link_details", {
      link: {},
      errors: errors.array(),
    });
  } else {
    const link = Link.build(req.body.original);
    await link.save();
    req.session.flash = { level: "success", msg: "Link successfully created." };
    res.redirect("/");
  }
}

async function updateLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("link_details", {
      link: {},
      errors: errors.array(),
    });
  } else {
    const updatedLink = Link.build(req.body.original);
    await Link.updateOne(
      { _id: req.params.id },
      { original: updatedLink.original, short: updatedLink.short }
    );
    req.session.flash = { level: "success", msg: "Link successfully updated." };
    res.redirect("/");
  }
}

async function deleteLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Onvalid request");
  }
  await Link.deleteOne({ _id: req.params.id });
  res.json({ id: req.params.id });
}

export default {
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
