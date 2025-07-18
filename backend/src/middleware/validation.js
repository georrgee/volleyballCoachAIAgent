const Joi = require('joi');
const logger = require('../utils/logger');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.warn('Validation error:', error.details);
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Validation schemas
const chatMessageSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
  sessionId: Joi.string().uuid().optional(),
  conversationHistory: Joi.array().items(
    Joi.object({
      role: Joi.string().valid('user', 'assistant').required(),
      content: Joi.string().required()
    })
  ).max(20).optional()
});

const sessionQuerySchema = Joi.object({
  category: Joi.string().valid('rules', 'techniques', 'strategy', 'training', 'position-specific', 'general').optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  page: Joi.number().integer().min(1).optional()
});

module.exports = {
  validate,
  chatMessageSchema,
  sessionQuerySchema
};