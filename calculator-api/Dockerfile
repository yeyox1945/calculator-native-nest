# -----------------------------------------------------------------------------
# Base Image
# -----------------------------------------------------------------------------
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# -----------------------------------------------------------------------------
# Stage 1: Install all dependencies
# -----------------------------------------------------------------------------
FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 2: Development (for local development with hot-reload)
# -----------------------------------------------------------------------------
FROM base AS development
ENV NODE_ENV=development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "start:dev"]

# -----------------------------------------------------------------------------
# Stage 3: Build the application & prune devDependencies
# -----------------------------------------------------------------------------
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm prune --prod

# -----------------------------------------------------------------------------
# Stage 4: Production Runner (minimal runtime image)
# -----------------------------------------------------------------------------
FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

# Use non-root node user for security
USER node

# Copy only production dependencies, compiled code and package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/main.js"]
