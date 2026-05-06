const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const { analyzeJob } = require('../controllers/jobController');

const router = express.Router();

router.use(verifyToken);

router.post(
  '/analyze',
  [
    body('jobDescription').notEmpty().withMessage('Job description text is required'),
  ],
  validate,
  analyzeJob
);

module.exports = router;
