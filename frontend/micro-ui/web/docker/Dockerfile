FROM node:14-bullseye-slim AS build

# Install runtime/build deps: python2 (if node-sass/native modules need it),
# build-essential (gcc/g++/make), git and ca-certificates.
# Note: we intentionally DO NOT npm install -g yarn because the base image
# already provides a yarn binary which caused the EEXIST symlink error.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python2 \
      build-essential \
      git \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Ensure "python" resolves to python2 and force npm/node-gyp to use it
RUN ln -sf /usr/bin/python2 /usr/bin/python
ENV PYTHON=/usr/bin/python
RUN npm config set python /usr/bin/python

ARG WORK_DIR
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=8168"
ENV GENERATE_SOURCEMAP="false"

ARG REACT_APP_PUBLIC_PATH
ENV REACT_APP_PUBLIC_PATH=${REACT_APP_PUBLIC_PATH}

COPY ${WORK_DIR} .
RUN ls -lah

WORKDIR /app/web

RUN chmod +x ./install-deps.sh
RUN ./install-deps.sh
RUN yarn config set network-timeout 600000

# Use --ignore-engines to bypass Node engine version checks (e.g. @noble/ciphers)
RUN yarn install --ignore-engines
RUN REACT_APP_PUBLIC_PATH=${REACT_APP_PUBLIC_PATH} yarn build:webpack

FROM nginx:mainline-alpine
ENV WORK_DIR=/var/web/digit-ui
RUN mkdir -p ${WORK_DIR}
COPY --from=build /app/web/build ${WORK_DIR}/
COPY --from=build /app/web/docker/nginx.conf /etc/nginx/conf.d/default.conf
