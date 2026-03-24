import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { tokenBlacklist } from "../utils/tokenBlacklist.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing or malformed Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  // Check if token has been blacklisted (logout)
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ success: false, message: "Token has been revoked" });
  }

  try {
    req.auth = jwt.verify(token, env.jwtSecret);
    req.user = { _id: req.auth.userId, ...req.auth };
    req.token = token; // store token ref for logout
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}