import { reductionService } from "../services/reductionService.js";
import { successResponse } from "../utils/apiResponse.js";

export const reductionController = {
  async listReductions(req, res, next) {
    try {
      const isCustomer = req.user.roles.includes("CUSTOMER");
      const data = isCustomer
        ? await reductionService.listForUser(req.user._id)
        : await reductionService.listAll();

      return successResponse(res, data, "Reductions loaded");
    } catch (error) {
      next(error);
    }
  },

  async createReduction(req, res, next) {
    try {
      const data = await reductionService.create({
        ...req.body,
        requestedBy: req.user._id
      });
      return successResponse(res, data, "Reduction request created", 201);
    } catch (error) {
      next(error);
    }
  },

  async decideReduction(req, res, next) {
    try {
      const data = await reductionService.decide(
        req.params.reductionId,
        req.body.status,
        req.user._id,
        req.body.reviewComment
      );
      return successResponse(res, data, "Reduction decision recorded");
    } catch (error) {
      next(error);
    }
  }
};