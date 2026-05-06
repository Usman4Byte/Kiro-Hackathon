const MatchResult = require('../models/MatchResult');
const AnalysisHistory = require('../models/AnalysisHistory');
const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const matchEngine = require('../ai/matchEngine');
const ApiError = require('../utils/ApiError');

class MatchService {
  async performAnalysis(userId, resumeId, jobId) {
    // 1. Fetch data (including embeddings)
    const resume = await Resume.findOne({ _id: resumeId, userId }).select('+embedding');
    const jobDescription = await JobDescription.findOne({ _id: jobId, userId }).select('+embedding');

    if (!resume || !jobDescription) {
      throw new ApiError(404, 'Resume or Job Description not found');
    }

    // 2. Run Match Engine
    const analysisResult = await matchEngine.calculateMatch(resume, jobDescription);

    // 3. Save Match Result
    const matchResult = await MatchResult.create({
      userId,
      resumeId,
      jobId,
      jobTitle: jobDescription.title,
      company: jobDescription.company,
      scores: {
        overall: analysisResult.overall,
        semantic: analysisResult.semantic,
        ats: analysisResult.ats,
        experience: analysisResult.experience,
      },
      matchedSkills: analysisResult.matchedSkills,
      missingSkills: analysisResult.missingSkills,
      weakSkills: analysisResult.weakSkills,
      radarData: analysisResult.radarData,
      semanticExplanation: analysisResult.semanticExplanation,
      suggestions: analysisResult.suggestions,
    });

    // 4. Save History Record
    await AnalysisHistory.create({
      userId,
      matchResultId: matchResult._id,
      metadata: { source: 'web' },
    });

    return matchResult;
  }

  async getHistory(userId) {
    return await MatchResult.find({ userId })
      .sort('-createdAt')
      .select('jobTitle company scores createdAt')
      .lean();
  }

  async getAnalysisDetails(userId, matchId) {
    const match = await MatchResult.findOne({ _id: matchId, userId });
    if (!match) throw new ApiError(404, 'Analysis not found');
    return match;
  }
}

module.exports = new MatchService();
