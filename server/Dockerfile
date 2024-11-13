# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]