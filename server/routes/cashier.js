import express from "express";
import { createReceipt, AddTable, getOrderReceipt, getTable, updateTableStatus } from "../controllers/cashierReceipt.js";

const router = express.Router();

// Create
router.post("/create-receipt", createReceipt)
router.post("/add-table", AddTable)

// Read
router.get("/get-receipt", getOrderReceipt)
router.get("/get-table", getTable)

// Update
router.put("/update-table-status", updateTableStatus)

export default router;