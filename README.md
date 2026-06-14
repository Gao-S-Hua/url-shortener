# About

This is a URL Shortening Service

# Setup
node >= 24
pnpm >= 24
MySQL

# Repo Structure

## client
Build with Vite, React, Antd

## Server
Build with NestJS, TypeORM, MySQL

## Shared
Common library shared among client and server


docker run --name url-db -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mysql:latest
