const matchService = require('../services/matchService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const analyzeMatch = asyncHandler(async (req, res) => {
  const { resumeId, jobId } = req.body;
  const userId = req.user._id;

  const matchResult = await matchService.performAnalysis(userId, resumeId, jobId);

  res.status(200).json(
    new ApiResponse(200, matchResult, 'Analysis complete')
  );
});

const getHistory = asyncHandler(async (req, res) => {
  const history = await matchService.getHistory(req.user._id);
  res.status(200).json(new ApiResponse(200, history));
});

const getMatchDetails = asyncHandler(async (req, res) => {
  const match = await matchService.getAnalysisDetails(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, match));
});

module.exports = {
  analyzeMatch,
  getHistory,
  getMatchDetails,
};
