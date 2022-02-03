FROM node:16-alpine3.14

WORKDIR /app

COPY build /app

CMD npx serve -s .