FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
WORKDIR /app

COPY tsconfig.json tsup.config.ts ./
COPY src/ ./src/
COPY frontend/ ./frontend/

WORKDIR /app/frontend
RUN npm run build

WORKDIR /app
RUN npm run build:backend

FROM node:18-alpine as runtime

RUN apk add --no-cache netcat-openbsd curl

RUN curl -fsSLO https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-alpine-7.0.5.tgz && \
    tar -xzf mongodb-linux-x86_64-alpine-7.0.5.tgz && \
    mv mongodb-linux-x86_64-alpine-7.0.5/bin/* /usr/local/bin/ && \
    rm -rf mongodb-linux-x86_64-alpine-7.0.5*

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/frontend/dist ./frontend/dist

RUN mkdir -p /data/db

EXPOSE 3000

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
