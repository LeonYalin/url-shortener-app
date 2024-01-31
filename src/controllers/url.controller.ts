import { Request, Response } from "express";
import { validationResult } from "express-validator";

function getById(req: Request, res: Response) {
  const isNew = req.params.id === "0";
  res.render("url_details", {
    url: {
      original: isNew ? "" : "https://pugjs.org/language/iteration.html",
      short: isNew ? "" : "http://localhost:3000/s/fh4sdh",
    },
  });
}

function submit(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("url_details", {
      url: {
        original: "https://pugjs.org/language/iteration.html",
        short: "http://localhost:3000/s/fh4sdh",
      },
      params: req.params,
      errors: errors.array(),
    });
  } else {
    res.redirect("index");
  }
}

export default {
  getById,
  submit,
};
