import express, { Router } from "express";
import { login, addUser, getUser, getVoidPin, getVoidPinId, getUserId, updateUser, updateUserPassword, updateVoid, deleteAccount } from "../controllers/auth.js";

const router = express.Router();
  
router.post("/login", login);

// Create
router.post("/createAccount", addUser)

// Read
router.get("/getAccount", getUser)
router.get("/getAccount/:id", getUserId)
router.get("/getVoid", getVoidPin)
router.get("/getVoid/:id", getVoidPinId)

// Update
router.put("/updateAccount/:id", updateUser)
router.put("/updatePassword/:id", updateUserPassword)
router.put("/updateVoid/:id", updateVoid)

// Delete
router.delete("/deleteAccount/:id", deleteAccount)

export default router;
