import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
  },
  pax: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Table = mongoose.model("Table", TableSchema)
export default Table;
