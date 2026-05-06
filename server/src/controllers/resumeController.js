const resumeService = require('../services/resumeService');
const fileService = require('../services/fileService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const uploadResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let rawText = req.body.resumeText;
  let originalFilename = null;
  let fileUrl = null;

  if (req.file) {
    // Extract text from file
    rawText = await fileService.extractText(req.file.path, req.file.mimetype);
    originalFilename = req.file.originalname;
    fileUrl = `/uploads/${req.file.filename}`;
  }

  if (!rawText) {
    throw new ApiError(400, 'Either a file or raw text must be provided');
  }

  const resume = await resumeService.processResume(userId, rawText, originalFilename, fileUrl);

  res.status(201).json(
    new ApiResponse(201, { resumeId: resume._id }, 'Resume processed successfully')
  );
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, resume));
});

module.exports = {
  uploadResume,
  getResume,
};
