import {
    createMenteeFeedback,
    createMentorFeedback,
    getFeedbackBySession,
  } from "../services/feedbackService.js";
  
  export const submitMenteeFeedback = async (req, res) => {
    try {
      const { sessionId, rating, comment } = req.body;
      const feedback = await createMenteeFeedback({
        sessionId,
        rating,
        comment,
        menteeId: req.user.userId,
      });
      res.status(201).json({ message: "Feedback submitted", feedback });
    } catch (err) {
        console.log(err)
      res.status(400).json({ error: err.message });
    }
  };
  
  export const submitMentorFeedback = async (req, res) => {
    try {
      const { sessionId, rating, comment } = req.body;
      const feedback = await createMentorFeedback({
        sessionId,
        rating,
        comment,
        mentorId: req.user.userId,
      });
      res.status(201).json({ message: "Feedback submitted", feedback });
    } catch (err) {
        console.log(err);
      res.status(400).json({ error: err.message });
    }
  };
  
  export const getSessionFeedback = async (req, res) => {
    try {
      const feedback = await getFeedbackBySession(req.params.sessionId);
      res.json({ feedback });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  