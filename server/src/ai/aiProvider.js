const geminiProvider = require('./providers/gemini');
const logger = require('../utils/logger');

class AIProvider {
  constructor() {
    // Default to Gemini, can be expanded to allow dynamic switching
    this.provider = geminiProvider;
  }

  async generateText(prompt, systemInstruction = '') {
    return await this.provider.generateText(prompt, systemInstruction);
  }

  async generateJSON(prompt, systemInstruction = '') {
    return await this.provider.generateJSON(prompt, systemInstruction);
  }

  async getEmbedding(text) {
    return await this.provider.getEmbedding(text);
  }
}

module.exports = new AIProvider();
