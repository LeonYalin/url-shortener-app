import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Url Shortener",
    message: "Hello there!",
  });
});

export { router as urlRoutes };
