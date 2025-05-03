import {
  createSessionRequest,
  updateSessionRequestStatus,
  getMySessions,
  createSessionFromRequest,
  getSessionById,
  updateSessionDetails,
  getAllSessions,
} from '../services/sessionService.js';

export const requestSession = async (req, res) => {
  try {
    const { mentorId, date, startTime, endTime, notes } = req.body;
    const session = await createSessionRequest({
      menteeId: req.user.userId,
      mentorId,
      date,
      startTime,
      endTime,
      notes,
    });
    res.status(201).json({ message: 'Session requested', session });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const approveSessionRequest = async (req, res) => {
  try {
    const updated = await updateSessionRequestStatus(
      req.params.id,
      'approved',
      req.user.userId,
    );
    res.json({ message: 'Session approved', session: updated });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err.message });
  }
};

export const declineSessionRequest = async (req, res) => {
  try {
    const updated = await updateSessionRequestStatus(
      req.params.id,
      'declined',
      req.user.userId,
    );
    res.json({ message: 'Session declined', session: updated });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const getMySessionRequests = async (req, res) => {
  try {
    const sessions = await getMySessions(req.user.userId, req.user.role);
    res.json({ sessions });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

export const createSession = async (req, res) => {
    try {
      const { sessionRequestId } = req.body;
      const session = await createSessionFromRequest(sessionRequestId);
      res.status(201).json({ message: 'Session created', session });
    } catch (err) {
        console.log(err)
      res.status(400).json({ error: err.message });
    }
  };
  
  export const getSession = async (req, res) => {
    try {
      const session = await getSessionById(req.params.sessionId);
      if (!session) return res.status(404).json({ error: 'Session not found' });
      res.json(session);
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateSession = async (req, res) => {
    try {
      const { recordingUrl, transcript, feedback } = req.body;
      const session = await updateSessionDetails(req.params.id, { recordingUrl, transcript, feedback });
      res.json({ message: 'Session updated', session });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const listSessions = async (_req, res) => {
    try {
      const sessions = await getAllSessions();
      res.json({ sessions });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };