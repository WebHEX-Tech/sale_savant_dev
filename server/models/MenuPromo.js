import mongoose from "mongoose";

const MenuPromoSchema = new mongoose.Schema(
  {
    promoName: {
      type: String,
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
    promoDesc: {
      type: String,
    },
    pricePromo: {
      type: Number,
      required: true,
    },
    validDate: {
      type: Date,
      required: true,
    },
    noSold: {
      type: Number,
    },
  },
  { timestamps: true }
);

const MenuPromo = mongoose.model("MenuPromo", MenuPromoSchema);
export default MenuPromo;
