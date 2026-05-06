const aiProvider = require('./aiProvider');
const logger = require('../utils/logger');

class ResumeAnalyzer {
  async parseResume(rawText) {
    const prompt = `
      Analyze the following resume text and extract the information into a structured JSON format.
      
      Required structure:
      {
        "contact": {
          "email": "extracted email or null",
          "phone": "extracted phone or null",
          "links": ["linkedin url", "github url", "portfolio url", etc]
        },
        "skills": ["skill 1", "skill 2", "skill 3", etc],
        "experience": [
          {
            "title": "job title",
            "company": "company name",
            "dateRange": "duration",
            "bullets": ["responsibility 1", "responsibility 2"]
          }
        ],
        "education": [
          {
            "degree": "degree name",
            "institution": "university/school",
            "year": "graduation year"
          }
        ]
      }

      Rules:
      - Normalize skill names (e.g., "Node.js" instead of "node js").
      - Only extract actual professional skills, not soft skills like "Hardworking".
      - Ensure the output strictly follows the JSON schema provided above.

      Resume Text:
      ${rawText}
    `;

    const systemInstruction = 'You are an expert technical recruiter and resume parser. Output strictly valid JSON.';

    try {
      return await aiProvider.generateJSON(prompt, systemInstruction);
    } catch (error) {
      logger.error('Error parsing resume with AI:', error);
      throw new Error('Failed to parse resume');
    }
  }

  async getResumeEmbedding(rawText) {
    try {
      return await aiProvider.getEmbedding(rawText);
    } catch (error) {
      logger.error('Error generating resume embedding:', error);
      throw new Error('Failed to generate resume embedding');
    }
  }
}

module.exports = new ResumeAnalyzer();
