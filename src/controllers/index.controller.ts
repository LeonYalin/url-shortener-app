import { Request, Response } from "express";
import { Link } from "../models/link.model";

async function getAllLinks(req: Request, res: Response) {
  const links = await Link.find();
  res.render("index", {
    title: "Url Shortener",
    links,
  });
}

export default {
  getAllLinks,
};
