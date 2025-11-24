import express from "express";
import { runPrompt } from "../controllers/promptsController.js";
import verifyUser from "../utils/verifyUser.js";
import checkUsage from "../utils/checkUsage.js";

const router = express.Router();

router.post("/run", verifyUser, checkUsage, runPrompt);

export default router;
