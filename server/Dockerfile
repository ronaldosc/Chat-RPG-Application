FROM node:26.4.0-alpine3.24
WORKDIR /node-app
COPY ./server .
COPY ./client/dist /node-app/dist/public
RUN npm install
EXPOSE 5000 5001
ENTRYPOINT npm run build
