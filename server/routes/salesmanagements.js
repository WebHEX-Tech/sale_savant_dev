import express from "express";
import { deleteAllSales, deleteOrderSale, getOrderSale, getTotalSaleStats } from "../controllers/salesmanagement.js";

const router = express.Router();

// Read
router.get("/get-orderSales", getOrderSale)
router.get("/get-totalSaleStats", getTotalSaleStats)

// Delete
router.delete("/delete-orderSale/:id", deleteOrderSale)
router.delete("/delete-allSale", deleteAllSales)

export default router;