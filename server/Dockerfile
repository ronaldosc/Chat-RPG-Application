FROM node:18-alpine
WORKDIR /node-app
COPY ./server .
COPY ./client/dist /node-app/dist/public
RUN npm install
EXPOSE 5000 5001
ENTRYPOINT npm run build
