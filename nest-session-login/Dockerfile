FROM node:16.7.0-buster AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build && rm -rf node_modules && yarn install --prod && yarn prisma generate && yarn remove prisma

FROM node:16.7.0-buster
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["node", "dist/main"]