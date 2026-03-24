import { claimService } from "../services/claimService.js";
import { successResponse } from "../utils/apiResponse.js";

export const claimController = {
  async listClaims(req, res, next) {
    try {
      const isCustomer = req.user.roles.includes("CUSTOMER");
      const data = isCustomer
        ? await claimService.listForUser(req.user._id)
        : await claimService.listAll();

      return successResponse(res, data, "Claims loaded");
    } catch (error) {
      next(error);
    }
  },

  async createClaim(req, res, next) {
    try {
      const data = await claimService.create({
        ...req.body,
        policy: req.body.policyId,
        submittedBy: req.user._id
      });
      return successResponse(res, data, "Claim created", 201);
    } catch (error) {
      next(error);
    }
  },

  async decideClaim(req, res, next) {
    try {
      const data = await claimService.decide(
        req.params.claimId,
        req.body.status,
        req.user._id,
        req.body.decisionComment
      );
      return successResponse(res, data, "Claim decision recorded");
    } catch (error) {
      next(error);
    }
  }
};