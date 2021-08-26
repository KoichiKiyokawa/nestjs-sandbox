FROM node:16.7.0-buster
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma generate && yarn build
EXPOSE 3000
CMD ["node", "dist/src/main"]