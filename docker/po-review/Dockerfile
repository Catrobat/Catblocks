FROM node:16-alpine

LABEL org.opencontainers.image.authors="Catblocks https://github.com/Catrobat/Catblocks"

ARG REPO="https://github.com/Catrobat/Catblocks.git"
ARG SHAREROOT="https://share.catrob.at/app/download/"
ARG WORKHOME="/"
ARG REPONAME="Catblocks"
ARG REPOHOME="${WORKHOME}${REPONAME}/"
ARG TESTDIR="/test/programs/"
ARG SERVERPORT=8080


# enable new repositories
RUN \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

# update and upgrade
RUN apk --no-cache  update \
  && apk --no-cache  upgrade

# install build dependencies
RUN \
  apk add --no-cache --virtual .build-deps python3 make g++

RUN apk add --no-cache --virtual gifsicle pngquant optipng libjpeg-turbo-utils \
    udev ttf-opensans chromium git wget

# remove cache
RUN rm -rf /var/cache/apk/* /tmp/*

# set environment variables
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV REPO $REPO
ENV SHAREROOT $SHAREROOT
ENV WORKHOME $WORKHOME
ENV REPONAME $REPONAME
ENV REPOHOME $REPOHOME
ENV TESTDIR $TESTDIR
ENV SERVERPORT $SERVERPORT

# copy and set entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]