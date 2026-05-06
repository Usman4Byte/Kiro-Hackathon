const express = require('express');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadResume, getResume } = require('../controllers/resumeController');

const router = express.Router();

router.use(verifyToken);

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/:id', getResume);

module.exports = router;
