import express from "express";
import * as availabilityController from "../controllers/availabilityController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add availability
router.post("/", authenticate, availabilityController.add);

// Get all availability slots
router.get("/", authenticate, availabilityController.getAll);

// Update availability
router.put("/", authenticate, availabilityController.update);

// Delete availability
router.delete("/", authenticate, availabilityController.deleteAvailability);

export default router;
