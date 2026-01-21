# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files for better layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for TypeScript build)
RUN npm ci

# Copy source code and TypeScript config files
COPY tsconfig.json tsconfig.production.json ./
COPY src/ ./src/
COPY @types/ ./@types/

# Build TypeScript (runs via postinstall script)
RUN npm run tsc

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/@types ./@types

# Expose port 80
EXPOSE 80

# Set PORT environment variable
ENV PORT=80

# Start the server
CMD ["node", "build/index.js"]
