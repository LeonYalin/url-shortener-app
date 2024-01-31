import { Request, Response } from "express";

function getUrls(req: Request, res: Response) {
  res.render("index", {
    title: "Url Shortener",
    urls: [
      {
        original: "https://pugjs.org/language/iteration.html",
        short: "http://localhost:3000/s/fh4sdh",
      },
      {
        original: "https://free-url-shortener.rb.gy/",
        short: "http://localhost:3000/s/sd8ask",
      },
      {
        original: "https://pugjs.org/language/iteration.html",
        short: "http://localhost:3000/s/fh4sdh",
      },
      {
        original: "https://free-url-shortener.rb.gy/",
        short: "http://localhost:3000/s/sd8ask",
      },
    ],
  });
}

export default {
  getUrls,
};
