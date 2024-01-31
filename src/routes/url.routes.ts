import express from "express";
import urlController from "../controllers/url.controller";
import { body } from "express-validator";

const router = express.Router();

router.get("/:id", urlController.getById);

router.post(
  "/submit",
  [
    body("original")
      .trim()
      .notEmpty()
      .withMessage("Field is required")
      .isURL()
      .withMessage("Field should be valid URL"),
  ],
  urlController.submit
);

export { router as urlRoutes };
