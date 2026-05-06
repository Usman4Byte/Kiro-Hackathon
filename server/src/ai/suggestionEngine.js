const aiProvider = require('./aiProvider');
const logger = require('../utils/logger');

class SuggestionEngine {
  async improveBullets(bullets, jobContext = '') {
    const prompt = `
      You are an expert resume writer and career coach.
      Improve the following resume bullet points to be more impactful, action-oriented, and metric-driven.
      
      ${jobContext ? `Target Job Context to align with: ${jobContext}` : ''}

      Original Bullets:
      ${JSON.stringify(bullets)}

      Return a JSON array of objects with the following structure:
      [
        {
          "original": "the original bullet text",
          "improved": "the rewritten, impactful bullet text",
          "category": "Impact" | "Action Verbs" | "Metrics" | "Clarity"
        }
      ]
    `;

    const systemInstruction = 'You are a professional resume re-writer. Output strictly valid JSON arrays.';

    try {
      return await aiProvider.generateJSON(prompt, systemInstruction);
    } catch (error) {
      logger.error('Error improving bullets with AI:', error);
      throw new Error('Failed to generate bullet improvements');
    }
  }

  async generateSummary(resumeData, jobContext) {
    const prompt = `
      Write a professional summary (3-4 sentences) for this candidate, highly tailored to the following job context.

      Candidate Data:
      ${JSON.stringify(resumeData)}

      Job Context:
      ${jobContext}
      
      Output a valid JSON object: { "summary": "The generated summary text..." }
    `;

    const systemInstruction = 'You are an executive resume writer. Output strictly valid JSON.';

    try {
      const result = await aiProvider.generateJSON(prompt, systemInstruction);
      return result.summary;
    } catch (error) {
      logger.error('Error generating summary with AI:', error);
      throw new Error('Failed to generate professional summary');
    }
  }
}

module.exports = new SuggestionEngine();
