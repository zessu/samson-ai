FROM oven/bun:debian AS base
WORKDIR /usr/src/app

FROM base AS build
COPY . .
RUN bun install
RUN bun run build:frontend

FROM base AS install-prod
COPY bun.lockb bun.lockb
COPY package.json package.json
RUN bun install --prod

FROM oven/bun:alpine AS release
USER bun

COPY --from=install-prod /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/packages/frontend/dist packages/frontend/dist

COPY --from=build /usr/src/app/packages/backend packages/backend
COPY --from=build /usr/src/app/packages/shared packages/shared
COPY --from=build /usr/src/app/bun.lockb bun.lockb
COPY --from=build /usr/src/app/bunfig.toml bunfig.toml
COPY --from=build /usr/src/app/package.json package.json

EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start:backend"]
