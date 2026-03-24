import { Router } from "express";
import { amendmentController } from "../controllers/amendmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { requirePolicyOwnership } from "../middleware/ownershipMiddleware.js";
import { createAmendmentValidator, decideAmendmentValidator } from "../validators/amendmentValidator.js";
import { handleValidation } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", authenticate, amendmentController.listAmendments);
router.post("/", authenticate, authorizeRoles("CUSTOMER", "AGENT", "ADMIN"), createAmendmentValidator, handleValidation, requirePolicyOwnership, amendmentController.createAmendment);
router.put("/:amendmentId/decision", authenticate, authorizeRoles("UNDERWRITER", "ADMIN"), decideAmendmentValidator, handleValidation, amendmentController.decideAmendment);

export default router;