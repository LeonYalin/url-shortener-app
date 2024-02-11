import express from "express";
import { param } from "express-validator";
import shortController from "../controllers/short.controller";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = express.Router();

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Url should not be empty")],
  cacheMiddleware,
  shortController.getShortById
);

export { router as shortRoutes };
