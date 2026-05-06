const { cosineSimilarity } = require('./embeddings');
const aiProvider = require('./aiProvider');
const logger = require('../utils/logger');

class MatchEngine {
  async calculateMatch(resume, jobDescription) {
    try {
      // 1. Semantic Similarity (Cosine Similarity between embeddings)
      const semanticScoreRaw = cosineSimilarity(resume.embedding, jobDescription.embedding);
      const semanticScore = Math.max(0, Math.min(100, Math.round(semanticScoreRaw * 100)));

      // 2. ATS & Skill overlap analysis
      const matchData = await this._analyzeSkillsAndContext(resume.parsedData, jobDescription.extractedSkills, jobDescription.requirements);

      // 3. Weighted Overall Score
      // Weights: Semantic (40%), Skill Overlap (30%), ATS Context (30%)
      const overallScore = Math.round(
        (semanticScore * 0.4) +
        (matchData.skillScore * 0.3) +
        (matchData.atsScore * 0.3)
      );

      return {
        overall: overallScore,
        semantic: semanticScore,
        ats: matchData.atsScore,
        experience: matchData.experienceScore || 70, // Mocked for now, can be extracted in AI
        matchedSkills: matchData.matchedSkills,
        missingSkills: matchData.missingSkills,
        weakSkills: matchData.weakSkills,
        radarData: this._generateRadarData(semanticScore, matchData.skillScore, matchData.atsScore),
        semanticExplanation: matchData.explanation,
        suggestions: matchData.suggestions,
      };

    } catch (error) {
      logger.error('MatchEngine calculation error:', error);
      throw new Error('Failed to calculate match score');
    }
  }

  async _analyzeSkillsAndContext(resumeData, jobSkills, jobRequirements) {
    const prompt = `
      You are an expert technical recruiter and ATS system evaluator.
      Compare the candidate's resume data against the job requirements and skills.

      Candidate Resume Data:
      ${JSON.stringify(resumeData)}

      Job Required Skills:
      ${JSON.stringify(jobSkills)}

      Job Requirements:
      ${JSON.stringify(jobRequirements)}

      Task: Return a detailed JSON analysis with the following structure:
      {
        "skillScore": 0-100 (how well skills match),
        "atsScore": 0-100 (keyword optimization and formatting readiness),
        "experienceScore": 0-100 (how well past experience aligns with job),
        "matchedSkills": [{ "name": "skill name", "strength": 0-100 }],
        "missingSkills": [{ "name": "skill name", "importance": "High" | "Medium" | "Low" }],
        "weakSkills": [{ "name": "skill name", "strength": 0-50, "note": "brief reason why it's weak" }],
        "explanation": "A 3-4 sentence professional explanation of the semantic match, contextually explaining why they are or aren't a good fit. Do not just list skills.",
        "suggestions": [
          {
            "priority": "High" | "Medium" | "Low",
            "category": "Experience" | "Skills" | "Formatting" | "Keywords",
            "title": "Short title",
            "description": "Detailed explanation of what to fix",
            "action": "Specific action item for the user"
          }
        ]
      }
    `;

    const systemInstruction = 'You are an elite ATS algorithm and senior recruiter. Be highly analytical and strictly output valid JSON.';
    return await aiProvider.generateJSON(prompt, systemInstruction);
  }

  _generateRadarData(semantic, skills, ats) {
    return [
      { subject: 'Semantic Match', A: semantic, fullMark: 100 },
      { subject: 'Skill Overlap', A: skills, fullMark: 100 },
      { subject: 'ATS Friendly', A: ats, fullMark: 100 },
      { subject: 'Experience Fit', A: Math.min(100, semantic + 10), fullMark: 100 },
      { subject: 'Core Tech Fit', A: Math.min(100, skills + 5), fullMark: 100 },
      { subject: 'Culture/Soft Skills', A: 85, fullMark: 100 },
    ];
  }
}

module.exports = new MatchEngine();
