import { claimRepository } from "../repositories/claimRepository.js";
import { AppError } from "../utils/appError.js";

export const claimService = {
  listAll() {
    return claimRepository.findAll();
  },

  listForUser(userId) {
    return claimRepository.findBySubmittedBy(userId);
  },

  create(payload) {
    return claimRepository.create(payload);
  },

  async decide(claimId, status, assignedAdjuster, decisionComment) {
    const claim = await claimRepository.findById(claimId);
    if (!claim) {
      throw new AppError("Claim not found", 404);
    }

    return claimRepository.updateById(claimId, {
      status,
      assignedAdjuster,
      decisionComment
    });
  }
};