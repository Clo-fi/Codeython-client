# 빌드 단계
FROM krmp-d2hub-idock.9rum.cc/goorm/node:20 AS build
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# 실행 단계
FROM krmp-d2hub-idock.9rum.cc/goorm/node:20
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["yarn", "dev"]
