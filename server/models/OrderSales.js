import mongoose from "mongoose";

const OrderSaleSchema = new mongoose.Schema(
  {
    orderNo: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentCode: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
    },
    noItems: {
      type: Number,
      required: true,
    },
    promoUsed: [
      {
        promoName: {
          type: String,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
    },
    amountDiscounted: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const OrderSale = mongoose.model("OrderSale", OrderSaleSchema);
export default OrderSale;
