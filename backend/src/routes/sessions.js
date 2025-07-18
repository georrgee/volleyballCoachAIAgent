const express = require('express');
const sessionController = require('../controllers/sessionController');
const { validate } = require('../middleware/validation');
const { sessionQuerySchema } = require('../services/validationService');

const router = express.Router();

// GET /api/sessions - Get all sessions
router.get('/', validate(sessionQuerySchema), sessionController.getAllSessions);

// GET /api/sessions/:sessionId - Get specific session
router.get('/:sessionId', sessionController.getSession);

// DELETE /api/sessions/:sessionId - Delete session
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;
