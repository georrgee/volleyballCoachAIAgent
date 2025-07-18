const Joi = require('joi');

exports.chatMessageSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
  sessionId: Joi.string().uuid().optional(),
  conversationHistory: Joi.array().items(
    Joi.object({
      role: Joi.string().valid('user', 'assistant').required(),
      content: Joi.string().required()
    })
  ).max(20).optional()
});

exports.sessionQuerySchema = Joi.object({
  category: Joi.string().valid('rules', 'techniques', 'strategy', 'training', 'position-specific', 'general').optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  page: Joi.number().integer().min(1).optional()
});