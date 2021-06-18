FROM node:alpine
WORKDIR /server-api
COPY package*.json ./
RUN npm install
COPY ./app ./app
COPY server.js .
EXPOSE 9001
CMD [ "node", "server.js" ]