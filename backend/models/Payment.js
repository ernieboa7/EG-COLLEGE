// models/Payment.js
/*
import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  items: [{ feeItemId: Number, amount: Number }],
  total: { type: Number, required: true },
  provider: { type: String, default: "stripe" },
  providerRef: String, // Stripe session/payment intent id
  status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
}, { timestamps: true });
export default mongoose.model("Payment", paymentSchema);
*/


// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },

    // Each payment may include multiple fee items (e.g. tuition, lab fee, etc.)
    items: [
      {
        feeItemId: Number,
        title: String,  // ✅ optional, to make it readable in the portal
        amount: Number,
      },
    ],

    total: { type: Number, required: true },
    provider: { type: String, default: "stripe" },
    providerRef: String, // Stripe session or payment intent ID

    // Payment status: in sandbox we set to "paid" immediately
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);

