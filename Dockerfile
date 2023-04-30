ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-slim AS builder

RUN apt-get update && apt-get install -y python3 build-essential

WORKDIR /app

COPY . .

RUN npm install
RUN npm run codegen
RUN npm run build

FROM gcr.io/distroless/nodejs:${NODE_VERSION}

WORKDIR /app

EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG VERSION=develop
ENV VERSION=${VERSION}

COPY --from=builder /app/packages/server /app/packages/server
COPY --from=builder /app/packages/commons /app/packages/commons

ENTRYPOINT [ "sh", "packages/server/docker-start.sh" ]
