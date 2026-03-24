import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Role } from "../models/Role.js";
import { ROLES } from "../constants/roles.js";
import { PERMISSIONS } from "../constants/permissions.js";

const roles = [
  { name: ROLES.CUSTOMER, permissions: ["NONE"] },
  { name: ROLES.AGENT, permissions: [PERMISSIONS.POLICY_CREATE] },
  { name: ROLES.UNDERWRITER, permissions: [PERMISSIONS.AMENDMENT_APPROVE, PERMISSIONS.REDUCTION_APPROVE] },
  { name: ROLES.CLAIMS_ADJUSTER, permissions: [PERMISSIONS.CLAIM_APPROVE] },
  { name: ROLES.CUSTOMER_SERVICE, permissions: ["NONE"] },
  { name: ROLES.COMPLIANCE_OFFICER, permissions: [PERMISSIONS.USER_READ_ALL] },
  {
    name: ROLES.ADMIN,
    permissions: Object.values(PERMISSIONS)
  }
];

async function seedRoles() {
  await connectDatabase();
  await Role.deleteMany({});
  await Role.insertMany(roles);
  console.log("Roles seeded.");
  await mongoose.disconnect();
}

seedRoles().catch((error) => {
  console.error(error);
  process.exit(1);
});