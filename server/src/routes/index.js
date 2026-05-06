const express = require('express');
const authRoutes = require('./auth');
const resumeRoutes = require('./resume');
const jobRoutes = require('./job');
const matchRoutes = require('./match');
const aiRoutes = require('./ai');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/resume', resumeRoutes);
router.use('/job', jobRoutes);
router.use('/match', matchRoutes);
router.use('/ai', aiRoutes);
router.use('/user', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;
