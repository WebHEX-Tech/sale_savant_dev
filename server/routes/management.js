import express from "express";
import { AddInventory, getMenu, getMenuInventory, deleteMenuInventory, deleteMenu} from "../controllers/management.js";

const router = express.Router();

// Create
router.post("/addinventory", AddInventory)

// Read
router.get("/menu", getMenu)
router.get("/menuInventory", getMenuInventory)

// Update


// Delete
router.delete("/menu/:id", deleteMenu)
router.delete("/menuInventory/:id", deleteMenuInventory)

export default router;