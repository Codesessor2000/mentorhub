import express from "express";
import {
  submitMenteeFeedback,
  submitMentorFeedback,
  getSessionFeedback,
} from "../controllers/feedbackController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/mentee", submitMenteeFeedback);
router.post("/mentor", submitMentorFeedback);
router.get("/:sessionId", getSessionFeedback);

export default router;
