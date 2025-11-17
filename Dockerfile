FROM node:24.11 AS build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:24.11 AS service

ENV SQLITE_DB_PATH=/app/newwork.db
ENV JWT_SECRET=12345874598249023
ENV HUGGINGFACE_API_TOKEN=false

WORKDIR /app

RUN chown node:node /app

COPY --from=build --chown=node:node /app/dist .
COPY --from=build --chown=node:node /app/package.json .
COPY --from=build --chown=node:node /app/package-lock.json .

RUN npm ci

USER node
RUN touch ${SQLITE_DB_PATH}

CMD ["node", "main.js"]
