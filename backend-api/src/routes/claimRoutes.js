import { Router } from "express";
import { claimController } from "../controllers/claimController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { requirePolicyOwnership } from "../middleware/ownershipMiddleware.js";
import { createClaimValidator, decideClaimValidator } from "../validators/claimValidator.js";
import { handleValidation } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", authenticate, claimController.listClaims);
router.post("/", authenticate, authorizeRoles("CUSTOMER", "ADMIN"), createClaimValidator, handleValidation, requirePolicyOwnership, claimController.createClaim);
router.put("/:claimId/decision", authenticate, authorizeRoles("CLAIMS_ADJUSTER", "ADMIN"), decideClaimValidator, handleValidation, claimController.decideClaim);

export default router;