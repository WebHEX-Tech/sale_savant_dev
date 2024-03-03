import express from "express";
import { AddSupplier, AddSupplyDelivery, deleteSupplier, deleteSupplyRecord, getSupplier, getSupplierId, getSupplyRecord, updateSupplier, updateTotalPaid } from "../controllers/supplierManagement.js";

const router = express.Router();

// Create
router.post("/add-supplier", AddSupplier)
router.post("/add-supplyDelivery", AddSupplyDelivery)

// Read
router.get("/get-supplier", getSupplier)
router.get("/get-supplyRecord", getSupplyRecord)
router.get("/get-supplier/:id", getSupplierId)

// Update
router.put("/edit-supplier/:id", updateSupplier)
router.put("/edit-totalPaid/:id", updateTotalPaid)

// Delete
router.delete("/delete-supplier/:id", deleteSupplier)
router.delete("/delete-supplyRecord/:id", deleteSupplyRecord)

export default router;