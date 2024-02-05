import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
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
    picturePath: {
        type: String,
      },
    description: {
      type: String,
      min: 2,
      max: 400,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
