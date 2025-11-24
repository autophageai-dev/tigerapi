import express from "express";
import { quickPrompt } from "../controllers/extensionController.js";
import verifyUser from "../utils/verifyUser.js";
import checkUsage from "../utils/checkUsage.js";

const router = express.Router();

router.post("/quickPrompt", verifyUser, checkUsage, quickPrompt);

export default router;
