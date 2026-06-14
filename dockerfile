FROM node:24-alpine

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps
COPY packages ./packages
COPY scripts ./scripts
RUN corepack enable
RUN pnpm install --frozen-lockfile

RUN pnpm run build:client

RUN pnpm run build:server

EXPOSE 3000

CMD node apps/server/scripts/migrate.js && node apps/server/dist/main.js