import express from "express";
import linkController from "../controllers/link.controller";
import { body, param } from "express-validator";

const idParamValidation = param("id")
  .notEmpty()
  .withMessage("Link ID should not be empty");

const originalParamValidation = body("original")
  .trim()
  .notEmpty()
  .withMessage("Field is required")
  .isURL()
  .withMessage("Field should be valid URL");

const router = express.Router();

router.get("/", linkController.getAllLinks);
router.get("/:id", linkController.getLinkById);
router.delete("/:id", [idParamValidation], linkController.deleteLink);
router.post("/:id", [originalParamValidation], linkController.createLink);
router.put(
  "/:id",
  [idParamValidation, originalParamValidation],
  linkController.updateLink
);

export { router as linkRoutes };
