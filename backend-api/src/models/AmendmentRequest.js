import mongoose from "mongoose";

const amendmentRequestSchema = new mongoose.Schema(
  {
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestType: { type: String, required: true },
    currentValue: { type: String },
    requestedValue: { type: String },
    reason: { type: String, required: true },
    status: { type: String, required: true, default: "PENDING" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewComment: { type: String, default: "" }
  },
  { timestamps: true }
);

export const AmendmentRequest = mongoose.model("AmendmentRequest", amendmentRequestSchema);