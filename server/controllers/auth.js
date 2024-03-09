import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Void from "../models/Void.js";

// Add User
export const addUser = async (req, res) => {
  try {
    const { userName, role, userNumber, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      role,
      userNumber,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { userNumber, password } = req.body;

    if (!userNumber || !password) {
      console.log("Both userNumber and password are required.");
      return res.status(400).end();
    }

    const user = await User.findOne({ userNumber: userNumber });

    if (!user) {
      console.log("Unique Number does not exist.");
      return res.status(400).end();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password.");
      return res.status(400).end();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    console.log("Login successful.");
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
};

// Get 
export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getVoidPin = async (req, res) => {
  try {
    const pin = await Void.find();
    res.status(200).json(pin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getVoidPinId = async (req, res) => {
  try {
    const voidId = req.params.id;
    const pin = await Void.findById(voidId);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json(pin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, role, userNumber, password } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ error: "user not found" });
    }

    existingUser.userName = userName;
    existingUser.role = role;
    existingUser.userNumber = userNumber;

    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ error: "user not found" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    existingUser.password = passwordHash;

    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateVoid = async (req, res) => {
  try {
    const { id } = req.params;
    const { voidPin } = req.body;

    const existingVoid = await Void.findById(id);

    if (!existingVoid) {
      return res.status(404).json({ error: "Void not found" });
    }

    existingVoid.voidPin =voidPin;

    const updatedVoid = await existingVoid.save();

    res.status(200).json(updatedVoid);
  } catch (error) {
    console.error("Error updating pin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete User
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAccount = await User.findById(id);

    if (!existingAccount) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
