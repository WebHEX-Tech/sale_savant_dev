import mongoose from "mongoose";

const VoidSchema = new mongoose.Schema({
  voidPin: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

const Void = mongoose.model("Void", VoidSchema)
export default Void;
