import { Router } from "express";
import { reductionController } from "../controllers/reductionController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { requirePolicyOwnership } from "../middleware/ownershipMiddleware.js";
import { createReductionValidator, decideReductionValidator } from "../validators/reductionValidator.js";
import { handleValidation } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", authenticate, reductionController.listReductions);
router.post("/", authenticate, authorizeRoles("CUSTOMER", "AGENT", "ADMIN"), createReductionValidator, handleValidation, requirePolicyOwnership, reductionController.createReduction);
router.put("/:reductionId/decision", authenticate, authorizeRoles("UNDERWRITER", "ADMIN"), decideReductionValidator, handleValidation, reductionController.decideReduction);

export default router;