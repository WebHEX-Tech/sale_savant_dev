import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  userType: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  userNumber: {
    type: String,
    required: true,
    min: 5,
    max: 12,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 12,
  },
}, {timestamps: true});

const User = mongoose.model("User", UserSchema)
export default User;
