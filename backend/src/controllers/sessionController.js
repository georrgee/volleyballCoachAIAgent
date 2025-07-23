const sessionService = require('../services/sessionService');
const { AppError } = require('../middleware/errorHandler');

exports.getAllSessions = async (req, res, next) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const { sessions, pagination } = await sessionService.getSessions({ category }, parseInt(limit), parseInt(page));
    res.json({ sessions, pagination });
  } catch (error) {
    next(error);
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const session = await sessionService.getSessionById(req.params.sessionId);
    if (!session) {
      throw new AppError('Session not found', 404);
    }
    res.json(session);
  } catch (error) {
    next(error);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const deleted = await sessionService.deleteSession(req.params.sessionId);
    if (!deleted) {
      throw new AppError('Session not found', 404);
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.createSession = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    const session = await sessionService.createSession({ title, category });
    res.status(201).json(session);
  } catch (error) {
    next(error)
  }
}