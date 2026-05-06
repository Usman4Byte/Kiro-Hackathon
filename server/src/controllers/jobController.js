const resumeService = require('../services/resumeService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const analyzeJob = asyncHandler(async (req, res) => {
  const { jobDescription } = req.body;
  const userId = req.user._id;

  const job = await resumeService.processJobDescription(userId, jobDescription);

  res.status(201).json(
    new ApiResponse(201, { jobId: job._id }, 'Job description analyzed successfully')
  );
});

module.exports = {
  analyzeJob,
};
