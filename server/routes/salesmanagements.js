import express from "express";
import { getOrderSale } from "../controllers/salesmanagement.js";

const router = express.Router();

// Read
router.get("/get-orderSales", getOrderSale)

export default router;