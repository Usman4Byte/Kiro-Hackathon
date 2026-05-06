const geminiProvider = require('./providers/gemini');
const openrouterProvider = require('./providers/openrouter');
const logger = require('../utils/logger');

class AIProvider {
  constructor() {
    this.primary = geminiProvider;
    this.fallback = openrouterProvider;
  }

  async generateText(prompt, systemInstruction = '') {
    try {
      return await this.primary.generateText(prompt, systemInstruction);
    } catch (error) {
      logger.warn('Primary AI provider failed, falling back to OpenRouter:', error.message);
      return await this.fallback.generateText(prompt, systemInstruction);
    }
  }

  async generateJSON(prompt, systemInstruction = '') {
    try {
      return await this.primary.generateJSON(prompt, systemInstruction);
    } catch (error) {
      logger.warn('Primary AI provider failed, falling back to OpenRouter:', error.message);
      return await this.fallback.generateJSON(prompt, systemInstruction);
    }
  }

  async getEmbedding(text) {
    // Embeddings usually have higher quota or are free for small texts, 
    // and OpenRouter fallback for embeddings is complex.
    return await this.primary.getEmbedding(text);
  }
}

module.exports = new AIProvider();
