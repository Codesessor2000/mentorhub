import express from "express";
import { getMentorDashboard, getMenteeDashboard } from "../controllers/analyticsController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeMentor, authorizeMentee } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Mentor dashboard analytics
router.get("/mentor/dashboard", authenticate, authorizeMentor, getMentorDashboard);

// Mentee dashboard analytics (we'll implement this logic next)
router.get("/mentee/dashboard", authenticate, authorizeMentee, getMenteeDashboard);

export default router;