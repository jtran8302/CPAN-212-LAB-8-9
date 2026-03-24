import { body, param } from "express-validator";

export const createReductionValidator = [
  body("policyId")
    .isMongoId()
    .withMessage("Valid policyId is required"),

  body("currentCoverage")
    .isNumeric()
    .withMessage("Current coverage must be numeric"),

  body("requestedCoverage")
    .isNumeric()
    .withMessage("Requested coverage must be numeric"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
];

export const decideReductionValidator = [
  param("reductionId")
    .isMongoId()
    .withMessage("Valid reductionId is required"),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["APPROVED", "REJECTED"])
    .withMessage("Status must be APPROVED or REJECTED"),

  body("reviewComment")
    .optional()
    .trim()
];