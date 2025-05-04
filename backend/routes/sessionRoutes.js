import express from "express";
import {
  requestSession,
  approveSessionRequest,
  declineSessionRequest,
  getMySessionRequests,
  createSession,
  getSession,
  // updateSession,
  listSessionsforMentor,
  listSessionsforMentee,
} from '../controllers/sessionController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/request', requestSession);
router.patch('/:id/approve', approveSessionRequest);
router.patch('/:id/decline', declineSessionRequest);
router.get('/my-requests', getMySessionRequests);

router.post('/', createSession); // requires sessionRequestId
// router.patch('/:id', updateSession);
router.get('/get-mentor-sessions', listSessionsforMentor);
router.get('/get-mentee-sessions', listSessionsforMentee);
router.get('/:sessionId', getSession);

export default router;
