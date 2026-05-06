FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source code
COPY . .

# Expose port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
