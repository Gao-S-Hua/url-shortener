# URL Shortener Service

A full-stack URL shortening service built with a modern monorepo architecture.

- Frontend: React + Vite + Ant Design
- Backend: NestJS + TypeORM + MySQL
- Monorepo: pnpm workspace
- Tooling: Biome (lint/format), Jest
- Deployment: Docker

# Demo

<img src="docs/demo.gif" width="700"/>

# Screenshots

## PC

<img src="docs/pc.png" width="700"/>

## Mobile

<img src="docs/mobile.jpeg" width="700"/>


# Architecture Overview

```
Client (React/Vite)
↓
Backend API (NestJS)
↓
Business Service Layer
↓
MySQL DB
```

# Key features:
- Generate short URL from original URL
- Redirect short code → original URL
- Click tracking (click_count)
- List and manage URLs


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
│       ├── migration/
│       ├── src/
│       │   ├── app/
│       │   ├── static/
│       │   ├── url-manage/
│       │   ├── url-redirect/
│       │   └── main.ts
│       └─ scripts
│
├── packages
│   └── shared/ # Shared types / utils
│
├── scripts # scripts for build & deploy
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

# Development Environment Setup

- Docker
- Node.js >= 24

# Start with docker compose

```bash
docker compose up
```

Open this URL to check the system:
```text
http://localhost:3000
```

Open the Swagger Documentation:
```text
http://localhost:3000/swagger/doc#
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

# Testing
pnpm run test
```
