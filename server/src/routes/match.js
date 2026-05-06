const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const { analyzeMatch, getHistory, getMatchDetails } = require('../controllers/matchController');

const router = express.Router();

router.use(verifyToken);

router.post(
  '/analyze',
  aiLimiter,
  [
    body('resumeId').notEmpty().withMessage('resumeId is required'),
    body('jobId').notEmpty().withMessage('jobId is required'),
  ],
  validate,
  analyzeMatch
);

router.get('/history', getHistory);
router.get('/:id', getMatchDetails);

module.exports = router;
