const Session = require('../models/Session');
const { AppError } = require('../middleware/errorHandler');
const { v4: uuidv4 } = require('uuid'); // Make sure uuid is installed


class SessionService {
  async getSessions(query = {}, limit = 20, page = 1) {
    const skip = (page - 1) * limit;
    const sessions = await Session.find(query)
      .select('sessionId title category createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Session.countDocuments(query);

    return {
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getSessionById(sessionId) {
    return await Session.findOne({ sessionId });
  }

  async deleteSession(sessionId) {
    return await Session.findOneAndDelete({ sessionId });
  }

  async createSession({ title, category = 'general' }) {
    const sessionId = uuidv4();
    const session = new Session({
      sessionId,
      title: title || 'New Volleyball Session',
      category,
      messages: []
    });
    
    await session.save();
    return session;
  }

  async createOrUpdateSession(sessionId, newMessages, category) {
    let session = await Session.findOne({ sessionId });

    if (!session) {
      session = new Session({
        sessionId,
        messages: [],
        category
      });
    }

    session.messages.push(...newMessages);
    session.category = category;
    await session.save();
    return session;
  }
}

module.exports = new SessionService();