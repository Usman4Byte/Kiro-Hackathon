const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const { improveBullets, rewriteSummary } = require('../controllers/aiController');

const router = express.Router();

router.use(verifyToken);
router.use(aiLimiter);

router.post(
  '/improve',
  [
    body('bullets').isArray().withMessage('Bullets must be an array'),
    body('jobContext').optional().isString(),
  ],
  validate,
  improveBullets
);

router.post(
  '/rewrite-summary',
  [
    body('resumeData').isObject().withMessage('Resume data is required'),
    body('jobContext').isString().withMessage('Job context is required'),
  ],
  validate,
  rewriteSummary
);

module.exports = router;
