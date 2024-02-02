import express from "express";
import linkController from "../controllers/link.controller";
import { body } from "express-validator";

const router = express.Router();

router.get("/:id", linkController.getLinkById);

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
  linkController.submitLink
);

export { router as urlRoutes };
