const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../../utils/logger');

class GeminiProvider {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use flash for fast text generation
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    // Use embedding model for semantic similarity
    this.embeddingModel = this.genAI.getGenerativeModel({ model: 'gemini-embedding-2' });
  }

  async generateText(prompt, systemInstruction) {
    try {
      const config = {};
      if (systemInstruction) {
        config.systemInstruction = { role: 'system', parts: [{ text: systemInstruction }] };
      }
      
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        ...config,
      });
      return result.response.text();
    } catch (error) {
      logger.error('Gemini generateText error:', error);
      throw new Error(`AI Provider Error: ${error.message}`);
    }
  }

  async generateJSON(prompt, systemInstruction) {
    try {
      // Configure for JSON output
      const config = {
        generationConfig: {
          responseMimeType: 'application/json',
        },
      };
      if (systemInstruction) {
        config.systemInstruction = { role: 'system', parts: [{ text: systemInstruction }] };
      }

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        ...config,
      });
      
      const text = result.response.text();
      return JSON.parse(text);
    } catch (error) {
      logger.error('Gemini generateJSON error:', error);
      throw new Error(`AI Provider Error: ${error.message}`);
    }
  }

  async getEmbedding(text) {
    try {
      const result = await this.embeddingModel.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      logger.error('Gemini getEmbedding error:', error);
      throw new Error(`AI Provider Error: ${error.message}`);
    }
  }
}

module.exports = new GeminiProvider();
