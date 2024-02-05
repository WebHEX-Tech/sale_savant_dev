import express from "express";
import { AddInventory, getMenu, getMenuInventory} from "../controllers/management.js";

const router = express.Router();

// Create
router.post("/addinventory", AddInventory)

// Read
router.get("/menu", getMenu)
router.get("/menuInventory", getMenuInventory)

export default router;