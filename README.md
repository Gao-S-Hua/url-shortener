# URL Shortener Service

A full-stack URL shortening service built with a modern monorepo architecture.

- Frontend: React + Vite + Ant Design
- Backend: NestJS + TypeORM + MySQL
- Monorepo: pnpm workspace
- Tooling: Biome (lint/format), Docker

# Architecture Overview

```
Client (React/Vite)
↓
API Gateway (NestJS)
↓
Business Service Layer
↓
MySQL DB
```

# Key features:
- Generate short URL from original URL
- Redirect short code → original URL
- Click tracking (click_count)
- Short URL List & Management


# Repo Structure

```shell
.
├── apps
│   ├── client/ # Frontend application
│   │   ├── src/
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── server/ # Backend service (NestJS)
│       ├── migation/
│       ├── src/
│       │   ├── app/
│       │   ├── static/
│       │   ├── url-manage/
│       │   ├── url-redirect/
│       │   └── main.ts
│       └─ .env
│
├── packages
│   └── shared/ # Shared types / utils
│
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

# Development Environment Setup

- docker
- node >= 24

# Start with docker compose

```bash
docker compose up
```

# How to dev

## Setup Env

Add `.env` file under apps/server (can copy the `.env.example` file and update to your local env)


```bash
# install dependencies
pnpm install

# FE local Dev
pnpm run dev:client

# BE local dev
pnpm run dev:server
```
