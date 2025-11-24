import express from "express";
import { runFlow } from "../controllers/composeController.js";
import verifyUser from "../utils/verifyUser.js";
import checkUsage from "../utils/checkUsage.js";

const router = express.Router();

router.post("/runFlow", verifyUser, checkUsage, runFlow);

export default router;
