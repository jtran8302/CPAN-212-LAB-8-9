import { body, param } from "express-validator";

export const createClaimValidator = [
  body("policyId")
    .isMongoId()
    .withMessage("Valid policyId is required"),

  body("claimType")
    .trim()
    .notEmpty()
    .withMessage("Claim type is required"),

  body("incidentDate")
    .isISO8601()
    .withMessage("Valid incident date is required"),

  body("claimAmount")
    .isNumeric()
    .withMessage("Claim amount must be numeric"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
];

export const decideClaimValidator = [
  param("claimId")
    .isMongoId()
    .withMessage("Valid claimId is required"),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["APPROVED", "REJECTED", "UNDER_REVIEW", "PAID"])
    .withMessage("Status must be APPROVED, REJECTED, UNDER_REVIEW, or PAID"),

  body("decisionComment")
    .optional()
    .trim()
];