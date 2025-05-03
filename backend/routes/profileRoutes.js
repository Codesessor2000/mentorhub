import express from "express";
import { getProfileController, updateProfileController } from "../controllers/profileController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/me", authenticate, getProfileController);

// Update logged-in user's profile
router.put("/me", authenticate, updateProfileController);

export default router;
