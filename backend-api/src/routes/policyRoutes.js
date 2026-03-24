import { Router } from "express";
import { policyController } from "../controllers/policyController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { createPolicyValidator } from "../validators/policyValidator.js";
import { handleValidation } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", authenticate, policyController.listPolicies);
router.post("/", authenticate, authorizeRoles("AGENT", "ADMIN"), createPolicyValidator, handleValidation, policyController.createPolicy);

export default router;