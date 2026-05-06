const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.use(verifyToken);

router.get('/profile', getProfile);

router.put(
  '/profile',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ],
  validate,
  updateProfile
);

module.exports = router;
