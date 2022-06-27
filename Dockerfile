##############################
## Building
##############################
FROM node:18-alpine as builder

# RUN apk update && apk upgrade

# Set working directory
WORKDIR /usr/src/app

# Set npm loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
COPY ./yarn.lock ./
COPY ./.yarnrc.yml ./
COPY ./.yarn ./.yarn
COPY ./packages ./packages

# Install dependencies
RUN yarn install --immutable

# Copy all files
COPY ./ ./

# Set node env
ENV NODE_ENV=production
ENV BASE_URL=/

# Build app
RUN yarn docs:build
#RUN yarn build

##############################
## Running
##############################
FROM halverneus/static-file-server:v1.8.6

# Set working directory
WORKDIR /usr/src/app

# Set folder
ENV FOLDER=/usr/src/app/web

COPY --from=builder /usr/src/app/components/.vitepress/dist ./web
