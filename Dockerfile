FROM node:20.12.2

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "dev"]
