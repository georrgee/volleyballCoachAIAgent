const rateLimit = require('express-rate-limit');
const config = require('../config');

const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || config.rateLimit.windowMs,
    max: options.max || config.rateLimit.max,
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(options.windowMs / 1000) || 900
    },
    standardHeaders: true,
    legacyHeaders: false,
    ...options
  });
};

// Different rate limits for different endpoints
const chatRateLimit = createRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute for chat
  message: {
    error: 'Too many chat requests. Please wait before sending another message.',
    retryAfter: 60
  }
});

const generalRateLimit = createRateLimiter();

module.exports = {
  chatRateLimit,
  generalRateLimit,
  createRateLimiter
};