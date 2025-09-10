FROM node:22.19.0-bookworm AS base
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm ci --omit=dev

FROM base AS builder-deps
RUN npm ci

FROM builder-deps AS builder

ARG CONTENT_ENDPOINT
ENV CONTENT_ENDPOINT=$CONTENT_ENDPOINT

COPY astro.config.mjs tsconfig.json prettier.config.cjs .prettierignore ./
COPY src ./src
COPY public ./public

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runtime
WORKDIR /home/nonroot/app

COPY --from=prod-deps --chown=nonroot:nonroot /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /usr/src/app/dist ./dist
COPY --chown=nonroot:nonroot server.mjs ./

ARG CONTENT_ENDPOINT
ENV CONTENT_ENDPOINT=$CONTENT_ENDPOINT
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

CMD [ "server.mjs" ]