const axios = require('axios');
const logger = require('../../utils/logger');

class OpenRouterProvider {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseUrl = 'https://openrouter.ai/api/v1';
    this.model = 'google/gemini-2.0-flash-001'; // Good, cheap fallback
  }

  async generateText(prompt, systemInstruction) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'https://github.com/Antigravity', // Optional for OpenRouter
            'X-Title': 'AI Resume Matching',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error('OpenRouter generateText error:', error.response?.data || error.message);
      throw new Error(`OpenRouter Error: ${error.message}`);
    }
  }

  async generateJSON(prompt, systemInstruction) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      let text = response.data.choices[0].message.content;
      
      // Clean markdown code blocks if present
      if (text.includes('```')) {
        text = text.replace(/```json\n?|```/g, '').trim();
      }
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        logger.error('JSON Parse Error. Raw Text:', text);
        throw parseError;
      }
    } catch (error) {
      logger.error('OpenRouter generateJSON error:', error.response?.data || error.message);
      throw new Error(`OpenRouter Error: ${error.message}`);
    }
  }

  // OpenRouter doesn't have a direct embedding API in the same way, 
  // but we can use their models or fallback to Gemini for embeddings if possible.
  // For now, if we use OpenRouter, we might skip embeddings or use a mock if strictly needed,
  // but let's assume Gemini embeddings work (often free tier is better for embeddings).
  async getEmbedding(text) {
    // If we need embeddings via OpenRouter, we'd need a model that supports it.
    // For now, let's keep this as a placeholder or throw.
    throw new Error('Embeddings not supported via OpenRouter provider yet');
  }
}

module.exports = new OpenRouterProvider();
