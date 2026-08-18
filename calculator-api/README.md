# Calculator API

A robust REST API built with [NestJS](https://nestjs.com/) for parsing, validating, and calculating mathematical expressions.

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
- [Running with Docker](#-running-with-docker)
  - [Development Mode (Live Reload)](#1-development-mode-with-live-reload)
  - [Production Mode](#2-production-mode)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)

---

## ✨ Features

- Mathematical expression evaluation with operator precedence support (`+`, `-`, `*`, `/`, `%`, `**`, `Math.sqrt`, etc.)
- Query parameter validation and sanitization via custom NestJS Pipes.
- Unit and end-to-end testing with Jest.
- Multi-stage Docker setup supporting both development and optimized production environments.
- CORS-enabled for cross-origin client integration (e.g., React Native, web).

---

## 🛠 Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: [pnpm](https://pnpm.io/) (`>= 9.x`)
- **Docker & Docker Compose** (optional, for containerized running)

---

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd calculator-api
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run start:dev
   ```

   The application will start on `http://localhost:3000`.

---

## 🐳 Running with Docker

This project includes a multi-stage `Dockerfile` and `docker-compose.yml` supporting both local development with hot-reload and optimized production deployments.

### 1. Development Mode (with Live Reload)

Mounts your local source code into the container so changes trigger instant reload:

```bash
# Using Docker Compose (Recommended)
docker compose up api-dev --build

# Or using Docker CLI directly
docker build --target development -t calculator-api:dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules calculator-api:dev
```

### 2. Production Mode

Builds a lightweight, secure container running as a non-root `node` user with compiled assets:

```bash
# Using Docker Compose
docker compose --profile prod up api-prod --build

# Or using Docker CLI directly
docker build --target production -t calculator-api:latest .
docker run -d -p 3000:3000 --name calculator-api calculator-api:latest
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm run start` | Starts the application in standard mode |
| `pnpm run start:dev` | Starts the application in watch mode (hot reload) |
| `pnpm run start:prod` | Runs the compiled output in `dist/` |
| `pnpm run build` | Compiles the TypeScript application into `dist/` |
| `pnpm run test` | Runs unit tests |
| `pnpm run test:watch` | Runs unit tests in watch mode |
| `pnpm run test:cov` | Runs tests and generates test coverage report |
| `pnpm run test:e2e` | Runs end-to-end integration tests |
| `pnpm run lint` | Runs ESLint and fixes auto-fixable issues |
| `pnpm run format` | Formats code with Prettier |

---

## 📡 API Reference

### 1. Health / Welcome
- **URL**: `GET /`
- **Response**:
  ```text
  Hello World!
  ```

---

### 2. Evaluate Expression
- **URL**: `GET /calculator`
- **Query Parameters**:
  - `expression` *(string, required)*: The mathematical expression to evaluate (URL-encoded if containing special symbols).

#### Examples:

**Request:**
```bash
curl "http://localhost:3000/calculator?expression=2%2B3*4"
```
**Response:**
```json
{
  "result": 14
}
```

**Request (Parentheses & Division):**
```bash
curl "http://localhost:3000/calculator?expression=(10%2B2)*(5-3)/4"
```
**Response:**
```json
{
  "result": 6
}
```

**Request (Square Root):**
```bash
curl "http://localhost:3000/calculator?expression=Math.sqrt(16)"
```
**Response:**
```json
{
  "result": 4
}
```

**Error Response (Invalid Expression):**
```json
{
  "statusCode": 400,
  "message": "Invalid expression provided",
  "error": "Bad Request"
}
```

---

## ⚙️ Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port on which the HTTP server will listen |
| `NODE_ENV` | `development` | Runtime environment (`development` / `production`) |
