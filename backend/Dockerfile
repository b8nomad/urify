# Backend Dockerfile
# 1) Base image for building
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
# Install all deps (including dev) for TypeScript build
RUN npm ci || npm install

# 2) Build stage (compile TypeScript)
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Compile TypeScript to dist
RUN npx tsc

# 3) Runtime stage
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY --from=build /app/dist ./dist
# Copy any required runtime files (e.g., .env will be mounted via compose)
EXPOSE 3000
CMD ["node", "dist/index.js"]
