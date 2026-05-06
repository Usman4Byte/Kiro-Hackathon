const suggestionEngine = require('../ai/suggestionEngine');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const improveBullets = asyncHandler(async (req, res) => {
  const { bullets, jobContext } = req.body;
  
  const improvedBullets = await suggestionEngine.improveBullets(bullets, jobContext);
  
  res.status(200).json(
    new ApiResponse(200, improvedBullets, 'Bullets improved successfully')
  );
});

const rewriteSummary = asyncHandler(async (req, res) => {
  const { resumeData, jobContext } = req.body;
  
  const summary = await suggestionEngine.generateSummary(resumeData, jobContext);
  
  res.status(200).json(
    new ApiResponse(200, { summary }, 'Summary generated successfully')
  );
});

module.exports = {
  improveBullets,
  rewriteSummary,
};
