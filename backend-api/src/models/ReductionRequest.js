import mongoose from "mongoose";

const reductionRequestSchema = new mongoose.Schema(
  {
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentCoverage: { type: Number, required: true },
    requestedCoverage: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true, default: "PENDING" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewComment: { type: String, default: "" }
  },
  { timestamps: true }
);

export const ReductionRequest = mongoose.model("ReductionRequest", reductionRequestSchema);