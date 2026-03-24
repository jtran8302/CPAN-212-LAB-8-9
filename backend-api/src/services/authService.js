import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { tokenService } from "./tokenService.js";
import { AppError } from "../utils/appError.js";
import { stripSensitiveUserFields } from "../utils/safeObject.js";

export const authService = {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = tokenService.generateAccessToken(user);
    return {
      token,
      user: stripSensitiveUserFields(user)
    };
  }
};