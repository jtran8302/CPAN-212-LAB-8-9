import { Claim } from "../models/Claim.js";

export const claimRepository = {
  findAll() {
    return Claim.find().sort({ createdAt: -1 });
  },
  findById(id) {
    return Claim.findById(id);
  },
  findBySubmittedBy(userId) {
    return Claim.find({ submittedBy: userId }).sort({ createdAt: -1 });
  },
  create(payload) {
    return Claim.create(payload);
  },
  updateById(id, payload) {
    return Claim.findByIdAndUpdate(id, payload, { new: true });
  }
};