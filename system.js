import express from "express";
import { healthCheck, configInfo } from "../controllers/systemController.js";

const router = express.Router();

router.get("/health", healthCheck);
router.get("/config", configInfo);

export default router;
