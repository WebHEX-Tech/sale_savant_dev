import express, { Router } from "express";
import { login, addUser, getUser, getVoidPin, getUserId, updateUser, deleteAccount } from "../controllers/auth.js";

const router = express.Router();
  
router.post("/login", login);

// Create
router.post("/createAccount", addUser)

// Read
router.get("/getAccount", getUser)
router.get("/getAccount/:id", getUserId)
router.get("/getVoid", getVoidPin)

// Update
router.put("/updateAccount/:id", updateUser)

// Delete
router.delete("/deleteAccount/:id", deleteAccount)

export default router;
