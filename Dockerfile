FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
COPY frontend/package*.json ./frontend/
RUN npm install
RUN cd frontend && npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY package*.json ./
COPY frontend/package*.json ./frontend/
RUN npm install
RUN cd frontend && npm install
COPY . .
RUN npm run build

FROM base AS production
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/build ./build
COPY --from=builder /app/frontend/dist ./frontend/dist
CMD ["npm", "start"]
