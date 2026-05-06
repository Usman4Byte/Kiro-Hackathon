const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000, // Effectively unlimited
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000, // Effectively unlimited
  message: 'AI request limit reached. Please try again in an hour.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000, // Effectively unlimited
  message: 'Too many login attempts, please try again later',
});

module.exports = {
  globalLimiter,
  aiLimiter,
  authLimiter,
};
