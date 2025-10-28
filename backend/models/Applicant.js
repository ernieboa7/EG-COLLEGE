



import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Applicant", applicantSchema);
