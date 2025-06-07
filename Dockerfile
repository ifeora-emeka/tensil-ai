FROM node:18-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

FROM base as build

RUN npm ci
COPY . .
RUN npm run build

FROM base as runtime

COPY --from=build /app/dist ./dist
COPY --from=build /app/frontend/dist ./frontend/dist

EXPOSE 3000

CMD ["npm", "start"]
