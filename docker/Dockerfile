FROM node:10-alpine

MAINTAINER Catblocks "https://github.com/Catrobat/Catblocks"

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

# define environment
ENV CHROME_BIN /usr/bin/chromium-browser
ENV LIGHTHOUSE_CHROMIUM_PATH /usr/bin/chromium-browser

# set container name and skip chromium download by jest
ENV DCONTAINER catblocks:v1
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1

# add catblocks user
RUN addgroup -S catrobat
RUN adduser -S catblocks -G catrobat
USER catblocks
WORKDIR /home/catblocks

# init catblocks setup
ENV CATROOT /home/catblocks/repo/
RUN mkdir -p /home/catblocks/repo/
COPY init.d/ /home/catblocks/repo/init.d/
COPY startCatblocks /home/catblocks/repo/
ENV PATH $PATH:/home/catblocks/repo/

# cmd
#CMD /bin/sh
ENTRYPOINT ["startCatblocks"]
