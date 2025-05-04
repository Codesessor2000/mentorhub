import express from "express";
import * as availabilityController from "../controllers/availabilityController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add availability
router.post("/", authenticate, availabilityController.add);



router.get('/mentors', authenticate, availabilityController.getAllMentors);
router.get(
  '/:mentorId',
  authenticate,
  availabilityController.getAllSlotsByMentorId,
);
// Get all availability slots
router.get('/', authenticate, availabilityController.getAll);

// Update availability
router.put('/:availabilityId', authenticate, availabilityController.update);

// Delete availability
router.delete(
  '/:availabilityId',
  authenticate,
  availabilityController.deleteAvailability,
);

export default router;
