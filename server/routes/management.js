import express from "express";
import { AddInventory, getMenu, getMenuId, getInventoryId, getMenuInventory, deleteMenuInventory, deleteMenu, updateMenu, updateInventory} from "../controllers/management.js";

const router = express.Router();

// Create
router.post("/addinventory", AddInventory)

// Read
router.get("/menu", getMenu)
router.get("/getMenu/:id", getMenuId)
router.get("/menuInventory", getMenuInventory)
router.get("/getInventory/:id", getInventoryId)

// Update
router.put("/editMenu/:id", updateMenu)
router.put("/editInventory/:id", updateInventory)

// Delete
router.delete("/menu/:id", deleteMenu)
router.delete("/menuInventory/:id", deleteMenuInventory)

export default router;