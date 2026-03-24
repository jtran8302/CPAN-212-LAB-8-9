export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const currentRoles = req.auth?.roles || [];
    const hasRole = currentRoles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  };
}