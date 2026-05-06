require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const swaggerSpecs = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { globalLimiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');
const ApiError = require('./utils/ApiError');

// Connect to MongoDB
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    credentials: true, // Allow cookies
  })
);
app.use(globalLimiter); // Global rate limiting

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static Files (for local uploaded resumes, optional)
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api', routes);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

// Handle 404 Routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

// Handle unhandled rejections globally
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});
