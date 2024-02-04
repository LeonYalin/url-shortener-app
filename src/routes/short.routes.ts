import express from "express";
import { param } from "express-validator";
import shortController from "../controllers/short.controller";

const router = express.Router();

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Url should not be empty")],
  shortController.getShortById
);

export { router as shortRoutes };
