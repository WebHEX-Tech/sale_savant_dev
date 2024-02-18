import express from "express";
import { createReceipt } from "../controllers/cashierReceipt.js";

const router = express.Router();

router.post("/create-receipt", createReceipt)

export default router;