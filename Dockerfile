FROM oven/bun:debian AS build
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun run build:frontend

FROM oven/bun:alpine AS release
USER bun

COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/packages/frontend/dist packages/frontend/dist
COPY --from=build /usr/src/app/packages/backend packages/backend
COPY --from=build /usr/src/app/packages/shared packages/shared
COPY --from=build /usr/src/app/bun.lock bun.lock
COPY --from=build /usr/src/app/bunfig.toml bunfig.toml
COPY --from=build /usr/src/app/package.json package.json

EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start:backend"]
