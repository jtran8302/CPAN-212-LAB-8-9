import { reductionRepository } from "../repositories/reductionRepository.js";
import { AppError } from "../utils/appError.js";

export const reductionService = {
  listAll() {
    return reductionRepository.findAll();
  },

  listForUser(userId) {
    return reductionRepository.findByRequestedBy(userId);
  },

  create(payload) {
    return reductionRepository.create(payload);
  },

  async decide(reductionId, status, reviewedBy, reviewComment) {
    const reduction = await reductionRepository.findById(reductionId);
    if (!reduction) {
      throw new AppError("Reduction request not found", 404);
    }

    return reductionRepository.updateById(reductionId, {
      status,
      reviewedBy,
      reviewComment
    });
  }
};