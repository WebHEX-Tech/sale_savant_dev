import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    contactNo:{
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
