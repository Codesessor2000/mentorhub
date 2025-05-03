import prisma from "../config/db.js";
import { startOfWeek, endOfWeek } from "date-fns";

export const getMentorDashboardData = async (mentorId) => {
    // Total number of sessions for the mentor
    const totalSessions = await prisma.session.count({
      where: { mentorId },
    });
  
    // Fetch all mentor ratings
    const feedbacks = await prisma.feedback.findMany({
      where: {
        session: { mentorId },
        mentorRating: { not: null },
      },
      select: { mentorRating: true },
    });
  
    const averageRating =
      feedbacks.reduce((acc, f) => acc + f.mentorRating, 0) / feedbacks.length || 0;
  
    // Fetch all sessions and group them by week
    const sessions = await prisma.session.findMany({
      where: { mentorId },
      select: { createdAt: true },
    });
  
    const sessionsPerWeek = {};
  
    sessions.forEach((session) => {
      const weekStart = startOfWeek(session.createdAt).toISOString().slice(0, 10); // YYYY-MM-DD
      if (!sessionsPerWeek[weekStart]) {
        sessionsPerWeek[weekStart] = 0;
      }
      sessionsPerWeek[weekStart]++;
    });
  
    return {
      totalSessions,
      averageRating: averageRating.toFixed(2),
      sessionsPerWeek, // object: { "2025-04-28": 3, "2025-05-05": 2, ... }
    };
  };

export const getMenteeDashboardData = async (menteeId) => {
    // Find all feedbacks related to the mentee
    const feedbacks = await prisma.feedback.findMany({
      where: {
        session: { menteeId },
      },
      select: {
        sessionId: true,   // Get sessionId
        menteeRating: true,
        mentorComment: true,
        mentorRating: true,
        session: {
          select: {
            mentorId: true, // Get mentorId from the session
            createdAt: true, // Get the session's createdAt date for week grouping
          },
        },
      },
    });
  
    // Check if no feedback data is found
    if (feedbacks.length === 0) {
      return {
        message: "No sessions attended yet. Please attend a session to see analytics.",
        mentorData: [],
      };
    }
  
    // Aggregate mentor data for mentee dashboard
    const mentorData = feedbacks.reduce((acc, feedback) => {
      const { mentorId, createdAt } = feedback.session;
      const weekStart = startOfWeek(new Date(createdAt));  // Get start of the week for the session
      const weekEnd = endOfWeek(new Date(createdAt));      // Get end of the week for the session
      const weekLabel = `${format(weekStart, "yyyy-MM-dd")} - ${format(weekEnd, "yyyy-MM-dd")}`;
      if (!acc[mentorId]) {
        acc[mentorId] = {
          mentorId,
          averageRating: 0,
          sessionsPerWeek: {},
        };
      }
      acc[mentorId].averageRating += feedback.mentorRating || 0;
      acc[mentorId].sessionsPerWeek[weekLabel] = (acc[mentorId].sessionsPerWeek[weekLabel] || 0) + 1;
  
      return acc;
    }, {});
  
    // Calculate the average rating for each mentor
    Object.values(mentorData).forEach((data) => {
      data.averageRating = (data.averageRating / data.sessionsPerWeek).toFixed(2);

      // Convert sessionsPerWeek to an array of week count data for frontend
      data.sessionsPerWeek = Object.keys(data.sessionsPerWeek).map((week) => ({
        week,
        count: data.sessionsPerWeek[week],
      }));
    });
  
    return { mentorData: Object.values(mentorData) };
  };