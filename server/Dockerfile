FROM node:18-alpine
WORKDIR /node-app
COPY ./server .
COPY ./client/dist /node-app/dist/public
COPY ./server/src/chat-rpg.pem-chain /node-app/chat-rpg.pem-chain
COPY ./server/src/chat-rpg.key /node-app/chat-rpg.key
RUN npm install
EXPOSE 5000 5001
ENTRYPOINT npm run build
