import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/links");
});

export { router as indexRoutes };
