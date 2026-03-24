import { roleRepository } from "../repositories/roleRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../utils/appError.js";
import { stripSensitiveUserFields } from "../utils/safeObject.js";

export const rbacService = {
  async listRoles() {
    return roleRepository.findAll();
  },

  async assignRoles(userId, roleNames) {
    const validRoles = await roleRepository.findByNames(roleNames);

    if (validRoles.length !== roleNames.length) {
      throw new AppError("One or more roles are invalid", 400);
    }

    // Convert to ObjectIds
    const roleIds = validRoles.map((r) => r._id);

    const user = await userRepository.updateById(userId, { roles: roleIds });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return stripSensitiveUserFields(user);
  }
};