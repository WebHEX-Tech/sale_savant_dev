import mongoose from "mongoose";

const MenuLossSchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date,
      required: true,
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
    salesTarget: {
      type: Number,
      required: true,
    },
    noSold: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    lossQuantity: {
      type: Number,
      required: true,
    },
    lossPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MenuLoss = mongoose.model("MenuLoss", MenuLossSchema);
export default MenuLoss;
