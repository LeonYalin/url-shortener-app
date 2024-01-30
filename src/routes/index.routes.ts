import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Url Shortener",
    urls: [
      {
        original: "https://pugjs.org/language/iteration.html",
        short: "http://localhost:3000/u/fh4sdh",
      },
      {
        original: "https://free-url-shortener.rb.gy/",
        short: "http://localhost:3000/u/sd8ask",
      },
      {
        original: "https://pugjs.org/language/iteration.html",
        short: "http://localhost:3000/u/fh4sdh",
      },
      {
        original: "https://free-url-shortener.rb.gy/",
        short: "http://localhost:3000/u/sd8ask",
      },
    ],
  });
});

export { router as indexRoutes };
