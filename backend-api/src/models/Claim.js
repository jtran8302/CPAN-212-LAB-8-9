import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    claimType: { type: String, required: true },
    incidentDate: { type: Date, required: true },
    claimAmount: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "SUBMITTED" },
    assignedAdjuster: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    decisionComment: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Claim = mongoose.model("Claim", claimSchema);