import { body } from "express-validator";

export const createPolicyValidator = [
  body("policyNumber").notEmpty().isString(),
  body("insuranceType").notEmpty().isString(),
  body("customerId").notEmpty().isString(),
  body("coverageAmount").isNumeric(),
  body("premiumAmount").isNumeric(),
  body("effectiveDate").notEmpty(),
  body("expiryDate").notEmpty()
];