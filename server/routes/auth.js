import express, { Router } from "express";
import { login, addUser, getUser, getUserId, updateUser, deleteAccount } from "../controllers/auth.js";

const router = express.Router();
  
router.post("/login", login);

// Create
router.post("/createAccount", addUser)

// Read
router.get("/getAccount", getUser)
router.get("/getAccount/:id", getUserId)

// Update
router.put("/updateAccount/:id", updateUser)

// Delete
router.delete("/deleteAccount/:id", deleteAccount)

export default router;
