const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const resumeAnalyzer = require('../ai/resumeAnalyzer');
const jobAnalyzer = require('../ai/jobAnalyzer');
const ApiError = require('../utils/ApiError');

class ResumeService {
  async processResume(userId, rawText, originalFilename = null, fileUrl = null) {
    // 1. AI Parsing
    const parsedData = await resumeAnalyzer.parseResume(rawText);
    
    // 2. Generate Embedding
    const embedding = await resumeAnalyzer.getResumeEmbedding(rawText);

    // 3. Save to DB
    const resume = await Resume.create({
      userId,
      originalFilename,
      fileUrl,
      rawText,
      parsedData,
      embedding,
    });

    return resume;
  }

  async processJobDescription(userId, rawText) {
    // 1. AI Parsing
    const parsedData = await jobAnalyzer.analyzeJobDescription(rawText);
    
    // 2. Generate Embedding
    const embedding = await jobAnalyzer.getJobEmbedding(rawText);

    // 3. Save to DB
    const jobDescription = await JobDescription.create({
      userId,
      title: parsedData.title,
      company: parsedData.company,
      rawText,
      extractedSkills: parsedData.extractedSkills,
      requirements: parsedData.requirements,
      embedding,
    });

    return jobDescription;
  }

  async getResumeById(userId, resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) throw new ApiError(404, 'Resume not found');
    return resume;
  }
}

module.exports = new ResumeService();
