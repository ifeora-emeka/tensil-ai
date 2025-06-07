# Build stage
FROM node:20 AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim AS production
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 3333

# Start the application
CMD ["npm", "start"]
