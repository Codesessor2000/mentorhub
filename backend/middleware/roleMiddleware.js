export const authorizeMentor = (req, res, next) => {
    if (req.user.role !== "mentor") {
      return res.status(403).json({ error: "Access denied: Mentor role required" });
    }
    next();
  };
  
  export const authorizeMentee = (req, res, next) => {
    if (req.user.role !== "mentee") {
      return res.status(403).json({ error: "Access denied: Mentee role required" });
    }
    next();
  };
  