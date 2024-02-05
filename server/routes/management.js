import express from "express";
import { AddInventory, AddMenu } from "../controllers/management.js";

const router = express.Router();

router.post("/addinventory", AddInventory)

export default router;