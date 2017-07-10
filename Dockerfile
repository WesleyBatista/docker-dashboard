FROM alpine

LABEL maintainer="@wesleybatistas"

# system
RUN apk add --update \
  g++ \
  make

# nodejs
RUN apk add --update \
  nodejs \
  nodejs-npm \
  && npm install -g npm@latest

RUN npm install -g node-gyp

# Python
RUN apk add --update \
  python \
  python-dev \
  py-pip

# cleanup apk cache
RUN rm -rf /var/cache/apk/*


# Set up APP_PATH
VOLUME /app
ENV APP_PATH /app

ADD . $APP_PATH

WORKDIR $APP_PATH

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]
