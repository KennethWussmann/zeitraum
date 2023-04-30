FROM node:18-slim

WORKDIR /app
EXPOSE 3000

COPY . .

RUN npm install
RUN npx turbo run build --filter=server

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG VERSION=develop
ENV VERSION=${VERSION}

ENTRYPOINT [ "sh", "packages/server/docker-start.sh" ]