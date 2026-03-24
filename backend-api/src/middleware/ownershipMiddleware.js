import { Policy } from "../models/Policy.js";
import { errorResponse } from "../utils/apiResponse.js";

export async function requirePolicyOwnership(req, res, next) {
  const policyId = req.params.policyId || req.body.policyId;

  if (!policyId) {
    return errorResponse(res, "Policy identifier is required", 400);
  }

  const policy = await Policy.findById(policyId);

  if (!policy) {
    return errorResponse(res, "Policy not found", 404);
  }

  const isAdmin = req.user?.roles?.includes("ADMIN");
  const isOwner = String(policy.customer) === String(req.user?._id);

  if (!isAdmin && !isOwner) {
    return errorResponse(res, "Forbidden: ownership validation failed", 403);
  }

  req.policy = policy;
  next();
}