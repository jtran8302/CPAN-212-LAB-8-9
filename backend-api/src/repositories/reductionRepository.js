import { ReductionRequest } from "../models/ReductionRequest.js";

export const reductionRepository = {
  findAll() {
    return ReductionRequest.find().sort({ createdAt: -1 });
  },
  findById(id) {
    return ReductionRequest.findById(id);
  },
  findByRequestedBy(userId) {
    return ReductionRequest.find({ requestedBy: userId }).sort({ createdAt: -1 });
  },
  create(payload) {
    return ReductionRequest.create(payload);
  },
  updateById(id, payload) {
    return ReductionRequest.findByIdAndUpdate(id, payload, { new: true });
  }
};