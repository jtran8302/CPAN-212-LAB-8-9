import { amendmentService } from "../services/amendmentService.js";
import { successResponse } from "../utils/apiResponse.js";

export const amendmentController = {
  async listAmendments(req, res, next) {
    try {
      const isCustomer = req.user.roles.includes("CUSTOMER");
      const data = isCustomer
        ? await amendmentService.listForUser(req.user._id)
        : await amendmentService.listAll();

      return successResponse(res, data, "Amendments loaded");
    } catch (error) {
      next(error);
    }
  },

  async createAmendment(req, res, next) {
    try {
      const data = await amendmentService.create({
        ...req.body,
        policy: req.body.policyId,
        requestedBy: req.user._id
      });
      return successResponse(res, data, "Amendment request created", 201);
    } catch (error) {
      next(error);
    }
  },

  async decideAmendment(req, res, next) {
    try {
      const data = await amendmentService.decide(
        req.params.amendmentId,
        req.body.status,
        req.user._id,
        req.body.reviewComment
      );
      return successResponse(res, data, "Amendment decision recorded");
    } catch (error) {
      next(error);
    }
  }
};