import { Request, Response } from "express";
import { Link } from "../models/link.model";

async function getAllLinks(req: Request, res: Response) {
  const links = await Link.find();
  const flash = { ...req.session.flash };
  req.session.flash = undefined;
  res.render("index", {
    title: "Url Shortener",
    links,
    flash,
  });
}

export default {
  getAllLinks,
};
