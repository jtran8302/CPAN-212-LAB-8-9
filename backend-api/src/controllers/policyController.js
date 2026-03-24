import { policyService } from "../services/policyService.js";
import { successResponse } from "../utils/apiResponse.js";

export const policyController = {
  async listPolicies(req, res, next) {
    try {
      const isCustomer = req.user.roles.includes("CUSTOMER");
      const data = isCustomer
        ? await policyService.listForCustomer(req.user._id)
        : await policyService.listAll();

      return successResponse(res, data, "Policies loaded");
    } catch (error) {
      next(error);
    }
  },

  async createPolicy(req, res, next) {
    try {
      const data = await policyService.create({
        ...req.body,
        customer: req.body.customerId,
        createdBy: req.user._id
      });
      return successResponse(res, data, "Policy created", 201);
    } catch (error) {
      next(error);
    }
  }
};