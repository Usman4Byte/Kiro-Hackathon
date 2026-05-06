const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ResumeAI Backend API',
      version: '1.0.0',
      description: 'API documentation for the AI-powered Resume & Job Matching System',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
