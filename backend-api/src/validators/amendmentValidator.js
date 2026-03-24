import { body, param } from "express-validator";

export const createAmendmentValidator = [
  body("policyId")
    .isMongoId()
    .withMessage("Valid policyId is required"),

  body("requestType")
    .trim()
    .notEmpty()
    .withMessage("Request type is required"),

  body("requestedValue")
    .trim()
    .notEmpty()
    .withMessage("Requested value is required"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
];

export const decideAmendmentValidator = [
  param("amendmentId")
    .isMongoId()
    .withMessage("Valid amendmentId is required"),

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