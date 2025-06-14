# Base image
FROM oven/bun:debian AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
COPY . .
RUN bun install --prod

# Build frontend
FROM base AS prerelease
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
RUN bun run build:frontend

# Final runtime image
FROM oven/bun:alpine AS release

# Copy only production node_modules
COPY --from=install /usr/src/app/node_modules node_modules

# Copy only required packages
COPY --from=prerelease /usr/src/app/packages/backend packages/backend
COPY --from=prerelease /usr/src/app/packages/frontend/dist packages/frontend/dist
COPY --from=prerelease /usr/src/app/packages/shared packages/shared
COPY --from=prerelease /usr/src/app/bun.lock bun.lock
COPY --from=prerelease /usr/src/app/bunfig.toml bunfig.toml
COPY --from=prerelease /usr/src/app/package.json package.json

# Runtime setup
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start:backend"]