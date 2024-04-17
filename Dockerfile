# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:20 AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Run stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:20
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["yarn", "dev"]
