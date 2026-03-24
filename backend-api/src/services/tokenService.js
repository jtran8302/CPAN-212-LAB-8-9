import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const tokenService = {
  generateAccessToken(user) {
    // Map role objects to role names if populated, otherwise keep as-is
    const roleNames = user.roles.map((r) => (typeof r === "object" && r.name ? r.name : r));

    return jwt.sign(
      {
        userId: String(user._id),
        username: user.username,
        roles: roleNames
      },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );
  }
};