import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Add User
export const addUser = async (req, res) => {
  try {
    const { userName, userType, userNumber, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      userType,
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
