FROM oven/bun:1.2.19-debian AS base
WORKDIR /usr/src/app

COPY package.json bun.lock ./

FROM base AS prod-deps
RUN bun install --frozen-lockfile --production

FROM base AS builder-deps
RUN bun install --frozen-lockfile

FROM builder-deps AS builder

ARG CONTENT_ENDPOINT
ENV CONTENT_ENDPOINT=$CONTENT_ENDPOINT

COPY astro.config.mjs tsconfig.json prettier.config.cjs .prettierignore ./
COPY src ./src
COPY public ./public

RUN bun run build

FROM oven/bun:1.2.19-slim AS runtime
WORKDIR /home/bun/app

COPY --from=prod-deps --chown=bun:bun /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=bun:bun /usr/src/app/dist ./dist
COPY --chown=bun:bun server.mjs ./

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

CMD [ "server.mjs" ]