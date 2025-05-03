import prisma from "../config/db.js";

// Mentee gives feedback to mentor
export const createMenteeFeedback = async ({ sessionId, rating, comment, menteeId }) => {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.menteeId !== menteeId) throw new Error("Unauthorized or session not found");
  
    const existingFeedback = await prisma.feedback.findUnique({ where: { sessionId } });
  
    if (existingFeedback) {
      // Update existing feedback
      return await prisma.feedback.update({
        where: { sessionId },
        data: {
          menteeRating: rating,
          menteeComment: comment,
        },
      });
    } else {
      // Create new feedback
      return await prisma.feedback.create({
        data: {
          sessionId,
          menteeRating: rating,
          menteeComment: comment,
        },
      });
    }
  };
  

// Mentor gives feedback to mentee
export const createMentorFeedback = async ({ sessionId, rating, comment, mentorId }) => {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.mentorId !== mentorId) throw new Error("Unauthorized or session not found");
  
    const existingFeedback = await prisma.feedback.findUnique({ where: { sessionId } });
  
    if (existingFeedback) {
      // Update existing feedback
      return await prisma.feedback.update({
        where: { sessionId },
        data: {
          mentorRating: rating,
          mentorComment: comment,
        },
      });
    } else {
      // Create new feedback
      return await prisma.feedback.create({
        data: {
          sessionId,
          mentorRating: rating,
          mentorComment: comment,
        },
      });
    }
  };

// Get feedback for a session
export const getFeedbackBySession = async (sessionId) => {
  return await prisma.feedback.findMany({
    where: { sessionId },
  });
};
