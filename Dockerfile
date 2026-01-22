# Backend build stage
FROM node:18-alpine AS backend-builder

# Install Python and build tools needed for native modules like bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app/backend

# Copy backend package files for better layer caching
COPY backend/package.json backend/package-lock.json ./

# Install all dependencies (including devDependencies for TypeScript build)
# Skip postinstall script since source files aren't copied yet
RUN npm ci --legacy-peer-deps --ignore-scripts

# Copy backend source code, TypeScript config files, and type definitions
COPY backend/tsconfig.json backend/tsconfig.production.json ./
COPY backend/src/ ./src/
COPY backend/@types/ ./@types/

# Build TypeScript
RUN npm run tsc

# Frontend build stage
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package.json frontend/package-lock.json ./

# Install frontend dependencies
RUN npm ci --legacy-peer-deps

# Copy frontend source code and config files
COPY frontend/vite.config.ts frontend/tsconfig.json frontend/tsconfig.node.json ./
COPY frontend/src/ ./src/
COPY frontend/public/ ./public/
COPY frontend/index.html ./

# Build frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./backend/

# Copy node_modules from builder stage (includes compiled native modules like bcrypt)
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules

# Remove devDependencies to reduce image size
RUN cd backend && npm prune --production

# Copy built backend files from builder stage
COPY --from=backend-builder /app/backend/build ./backend/build
COPY --from=backend-builder /app/backend/@types ./backend/@types

# Copy built frontend files from builder stage
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port 80
EXPOSE 80

# Set PORT environment variable
ENV PORT=80

# Set NODE_ENV to production
ENV NODE_ENV=production

# Required environment variables (must be provided at runtime via docker-compose or -e flags):
# - YOUTUBE_API_KEY
# - TMDB_API_READ_ACCESS_TOKEN
# - DATABASE_URL
# - SEND_GRID_API_KEY
# - SEND_GRID_REGISTERED_EMAIL_ADDRESS
# - SECRET
# - SESSION_COOKIE_SECRET
# Optional:
# - REPOSITORY_IMPLEMENTATION (defaults to "fileSystem")

# Start the server
WORKDIR /app/backend
CMD ["node", "build/index.js"]
