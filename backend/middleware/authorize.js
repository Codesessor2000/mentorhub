export const authorize = (allowedRoles = []) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied: insufficient permissions" });
      }
  
      next();
    };
  };
  