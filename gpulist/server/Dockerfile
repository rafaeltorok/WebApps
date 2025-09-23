FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./src ./src

RUN npm ci

EXPOSE 3001

ENV PORT=3001

CMD ["npm", "start"]