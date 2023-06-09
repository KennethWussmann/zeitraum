ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-slim AS builder

RUN apt-get update && apt-get install -y python3 build-essential

WORKDIR /app

COPY . .

RUN npm ci
RUN npx turbo run build --filter=@zeitraum/commons --filter=@zeitraum/server

FROM node:${NODE_VERSION}-slim 

WORKDIR /app

EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG VERSION=develop
ENV VERSION=${VERSION}

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json 
COPY --from=builder /app/packages/server /app/packages/server
COPY --from=builder /app/packages/commons /app/packages/commons

COPY packages/server/scripts/docker-start.mjs /app/start.mjs
COPY packages/server/scripts/docker-health-check.mjs /app/health-check.mjs

CMD [ "start.mjs" ]
