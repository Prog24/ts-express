FROM node:16-alpine

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "nodemon.json", "./"]
RUN yarn install
COPY . .
EXPOSE 3000
