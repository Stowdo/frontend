FROM node:16-alpine3.14 AS builder

WORKDIR /app
COPY public /app/public
COPY src /app/src
COPY package-lock.json /app
COPY package.json /app
COPY prod.env /app/.env
RUN npm install
RUN npm run build

FROM node:16-alpine3.14

WORKDIR /app
COPY --from=builder /app/build ./ 

CMD npx serve -s .