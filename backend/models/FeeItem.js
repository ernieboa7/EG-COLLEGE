// models/FeeItem.js
/*
import mongoose from "mongoose";
const feeItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true }, // "Tuition", "Lab", ...
  amount: { type: Number, required: true },
  applicableLevels: [Number], // e.g. [4,5,6] for SS1-SS3
}, { timestamps: true });
export default mongoose.model("FeeItem", feeItemSchema);

*/

// models/FeeItem.js
import mongoose from "mongoose";

const feeItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true }, // e.g. "Tuition Fee", "Lab Fee"
    amount: { type: Number, required: true }, // in EUR (before converting to cents)
    applicableLevels: [Number], // e.g. [4, 5, 6] for SS1–SS3
    description: { type: String }, //  optional — to show details in the UI
    isMandatory: { type: Boolean, default: true }, //  optional — to filter required fees
  },
  { timestamps: true }
);

export default mongoose.model("FeeItem", feeItemSchema);
