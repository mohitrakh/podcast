FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Ensure the uploads directory exists to prevent runtime errors
RUN mkdir -p uploads

# Expose the configured port (user updated to 5000)
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
