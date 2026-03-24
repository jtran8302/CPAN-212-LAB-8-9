import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    policyNumber: { type: String, required: true, unique: true },
    insuranceType: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverageAmount: { type: Number, required: true },
    premiumAmount: { type: Number, required: true },
    currency: { type: String, default: "CAD" },
    effectiveDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, required: true, default: "ACTIVE" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Policy = mongoose.model("Policy", policySchema);