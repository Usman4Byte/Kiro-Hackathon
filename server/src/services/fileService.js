const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

class FileService {
  async extractText(filePath, mimetype) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      let text = '';

      if (mimetype === 'application/pdf') {
        const data = await pdfParse(dataBuffer);
        text = data.text;
      } else if (
        mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const result = await mammoth.extractRawText({ buffer: dataBuffer });
        text = result.value;
      } else if (mimetype === 'text/plain') {
        text = dataBuffer.toString('utf8');
      } else {
        throw new ApiError(400, 'Unsupported file format');
      }

      if (!text || text.trim().length === 0) {
        throw new ApiError(400, 'Could not extract text from file');
      }

      return text;
    } catch (error) {
      logger.error('File extraction error:', error);
      throw new ApiError(500, `Failed to extract text: ${error.message}`);
    } finally {
      // Optional: Delete the file after extraction if you don't want to store it locally
      // await fs.unlink(filePath).catch(e => logger.error('Failed to clean up file:', e));
    }
  }
}

module.exports = new FileService();
