#
# ---- Args ----
ARG NODE_VERSION=16.17.0

#
# ---- Install and build node project ----
FROM node:$NODE_VERSION AS build
# set working directory
WORKDIR /home/app/

# copy project files
COPY . .

RUN npm set progress=false && npm config set depth 0 && npm ci
# Build project
RUN  npm run build
# Remove devDependencies
RUN npm prune --production

#
# ---- Release ----
FROM node:${NODE_VERSION}-slim

# use unprivileged user
USER node
WORKDIR /home/node/

# copy production node_modules
COPY --from=build /home/app/node_modules/ ./node_modules/
COPY --from=build /home/app/tsconfig.json /home/app/package.json ./
COPY --from=build /home/app/dist/ ./dist/

EXPOSE 5000
ENV NODE_ENV production
