import { AmendmentRequest } from "../models/AmendmentRequest.js";

export const amendmentRepository = {
  findAll() {
    return AmendmentRequest.find().sort({ createdAt: -1 });
  },
  findById(id) {
    return AmendmentRequest.findById(id);
  },
  findByRequestedBy(userId) {
    return AmendmentRequest.find({ requestedBy: userId }).sort({ createdAt: -1 });
  },
  create(payload) {
    return AmendmentRequest.create(payload);
  },
  updateById(id, payload) {
    return AmendmentRequest.findByIdAndUpdate(id, payload, { new: true });
  }
};