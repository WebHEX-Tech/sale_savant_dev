import mongoose from "mongoose";
import { getNextSequenceValue } from "./Counter.js";

const MenuInventorySchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date,
      required: true,
    },
    menuId: {
      type: Number,
      default: () => getNextSequenceValue("menuId"),
      unique: true,
    },
    menuItem: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    category: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    price: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    salesTarget: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 400,
    },
  },
  { timestamps: true }
);

const MenuInventory = mongoose.model("MenuInventory", MenuInventorySchema);
export default MenuInventory;
