const OpenAIService = require('../services/openaiService');
const sessionService = require('../services/sessionService');
const { categorizeMessage } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middleware/errorHandler');

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId, conversationHistory = [] } = req.body;

    if (!message || message.trim().length === 0) {
      throw new AppError('Message is required', 400);
    }

    const coachResponse = await OpenAIService.generateCoachResponse(message, conversationHistory);

    const currentSessionId = sessionId || uuidv4();
    const category = categorizeMessage(message);

    await sessionService.createOrUpdateSession(currentSessionId, [
      { role: 'user', content: message },
      { role: 'assistant', content: coachResponse }
    ], category);

    res.json({
      response: coachResponse,
      sessionId: currentSessionId,
      category,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};