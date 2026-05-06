const aiProvider = require('./aiProvider');
const logger = require('../utils/logger');

class JobAnalyzer {
  async analyzeJobDescription(rawText) {
    const prompt = `
      Analyze the following job description and extract key information into a structured JSON format.
      
      Required structure:
      {
        "title": "extracted job title or Unknown Role",
        "company": "extracted company name or Unknown Company",
        "extractedSkills": [
          {
            "name": "skill name",
            "importance": "High" | "Medium" | "Low"
          }
        ],
        "requirements": ["requirement 1", "requirement 2"]
      }

      Rules:
      - Normalize skill names (e.g., "React.js" instead of "react").
      - Determine importance based on how often it's mentioned or if it's explicitly stated as required vs preferred.
      - Ensure the output strictly follows the JSON schema provided above.

      Job Description:
      ${rawText}
    `;

    const systemInstruction = 'You are an expert technical recruiter. Output strictly valid JSON.';

    try {
      return await aiProvider.generateJSON(prompt, systemInstruction);
    } catch (error) {
      logger.error('Error parsing job description with AI:', error);
      throw new Error('Failed to parse job description');
    }
  }

  async getJobEmbedding(rawText) {
    try {
      return await aiProvider.getEmbedding(rawText);
    } catch (error) {
      logger.error('Error generating JD embedding:', error);
      throw new Error('Failed to generate JD embedding');
    }
  }
}

module.exports = new JobAnalyzer();
