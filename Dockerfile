FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /evalora/src/app

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build \
    && yarn install --production --ignore-scripts --prefer-offline

# ---

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /evalora/src/app

COPY --from=builder /evalora/src/app/ .

EXPOSE 8080

CMD ["node", "dist/main.js"]