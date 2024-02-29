import mongoose from "mongoose";

const MenuPromoSchema = new mongoose.Schema(
  {
    promoName: {
      type: String,
      required: true,
    },
    applicability: {
      type: String,
      required: true,
    },
    promoType:{
      type: String,
      required: true,
    },
    promoDesc: {
      type: String,
    },
    promoValue: {
      type: Number,
      required: true,
    },
    validDate: {
      type: Date,
      required: true,
    },
    promoStatus: {
      type: String,
      required: true,
    },
    promoUsage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MenuPromo = mongoose.model("MenuPromo", MenuPromoSchema);
export default MenuPromo;
