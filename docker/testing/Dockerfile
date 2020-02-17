FROM node:10-alpine

MAINTAINER Catblocks "https://github.com/Catrobat/Catblocks"
ARG REPO="https://github.com/Catrobat/Catblocks.git"
ARG BRANCH="develop"
ARG WORKHOME="/"
ARG RELREPOHOME="Catblocks"
ARG TESTDIR="/test/programs/"

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
    udev ttf-opensans chromium git

# remove cache
RUN rm -rf /var/cache/apk/* /tmp/*

# define chromium env variables
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1

# define repository env variables
ENV REPO $REPO
ENV BRANCH $BRANCH
ENV WORKHOME $WORKHOME
ENV REPOHOME $WORKHOME$RELREPOHOME
ENV TESTDIR $TESTDIR

# build init Catblocks project
WORKDIR $WORKHOME
RUN git clone -b $BRANCH $REPO $RELREPOHOME\
  && cd $RELREPOHOME \
  && yarn install 

# copy entrypoint
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
