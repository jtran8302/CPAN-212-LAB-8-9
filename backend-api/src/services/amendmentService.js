import { amendmentRepository } from "../repositories/amendmentRepository.js";
import { AppError } from "../utils/appError.js";

export const amendmentService = {
  listAll() {
    return amendmentRepository.findAll();
  },

  listForUser(userId) {
    return amendmentRepository.findByRequestedBy(userId);
  },

  create(payload) {
    return amendmentRepository.create(payload);
  },

  async decide(amendmentId, status, reviewedBy, reviewComment) {
    const amendment = await amendmentRepository.findById(amendmentId);
    if (!amendment) {
      throw new AppError("Amendment request not found", 404);
    }

    return amendmentRepository.updateById(amendmentId, {
      status,
      reviewedBy,
      reviewComment
    });
  }
};