import express from "express";
import indexController from "../controllers/index.controller";

const router = express.Router();

router.get("/", indexController.getUrls);

export { router as indexRoutes };
