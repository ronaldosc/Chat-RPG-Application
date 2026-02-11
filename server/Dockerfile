FROM node:25.6.0-alpine3.23
WORKDIR /node-app
COPY ./server .
COPY ./client/dist /node-app/dist/public
COPY ./server/src/chat-rpg.pem-chain /node-app/dist/chat-rpg.pem-chain
COPY ./server/src/chat-rpg.key /node-app/dist/chat-rpg.key
RUN npm install
EXPOSE 5000 5001
ENTRYPOINT npm run build
