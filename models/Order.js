import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
