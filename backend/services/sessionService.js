import prisma from '../config/db.js';

export const createSessionRequest = async ({
  menteeId,
  mentorId,
  date,
  startTime,
  endTime,
  notes,
}) => {
  return await prisma.sessionRequest.create({
    data: {
      menteeId,
      mentorId,
      date,
      startTime,
      endTime,
      notes,
    },
  });
};

export const updateSessionRequestStatus = async (id, status, mentorId) => {
  const session = await prisma.sessionRequest.findUnique({ where: { id } });
  if (!session || session.mentorId !== mentorId)
    throw new Error('Unauthorized or session not found');

  return await prisma.sessionRequest.update({
    where: { id },
    data: { status },
  });
};

export const getMySessions = async (userId, role) => {
  const whereClause =
    role === 'mentor' ? { mentorId: userId } : { menteeId: userId };

  return await prisma.sessionRequest.findMany({
    where: whereClause,
    include: {
      mentee: { select: { name: true, email: true } },
      mentor: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const createSessionFromRequest = async (sessionRequestId) => {
  const existing = await prisma.session.findUnique({
    where: { sessionRequestId },
  });
  if (existing) throw new Error('Session already created for this request');

  const request = await prisma.sessionRequest.findUnique({
    where: { id: sessionRequestId },
  });
  if (!request || request.status !== 'approved') {
    throw new Error('Invalid or unapproved session request');
  }

  const googleMeetLink = `https://meet.google.com/${sessionRequestId}`;

  return await prisma.session.create({
    data: {
        sessionRequestId: request.id,
        date: new Date(request.date),
        startTime: request.startTime,
        endTime: request.endTime,
        mentorId: request.mentorId,
        menteeId: request.menteeId,
        notes: request.notes,
        status: 'approved',
        googleMeetLink
    },
  });
};

export const getSessionById = async (sessionId) => {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      sessionRequest: {
        include: {
          mentee: { select: { name: true } },
          mentor: { select: { name: true } },
        },
      },
    },
  });
};

export const updateSessionDetails = async (
  sessionId,
  { recordingUrl, transcript, feedback },
) => {
  return await prisma.session.update({
    where: { id: sessionId },
    data: { recordingUrl, transcript, feedback },
  });
};

export const getAllSessions = async () => {
  return await prisma.session.findMany({
    include: {
      sessionRequest: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};