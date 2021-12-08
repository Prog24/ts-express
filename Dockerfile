FROM node:16-alpine

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock"]

COPY . .
RUN yarn install
EXPOSE 3000
