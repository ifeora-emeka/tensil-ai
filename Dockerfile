FROM node:20 AS base
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

FROM postgres:16-alpine AS production
RUN apk add --no-cache nodejs npm supervisor

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/build ./build
COPY --from=builder /app/frontend/dist ./frontend/dist

RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8080 5432
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
