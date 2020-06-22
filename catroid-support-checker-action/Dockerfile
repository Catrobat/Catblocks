FROM alpine

MAINTAINER Catblocks "https://github.com/Catrobat/Catblocks"

ARG CATBLOCKSREPO="https://github.com/Catrobat/Catblocks.git"
ARG CATROIDREPO="https://github.com/Catrobat/Catroid.git"
ARG WORKDIR="/checker/"

# enable new repositories
RUN \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

# update and upgrade
RUN apk --no-cache  update \
  && apk --no-cache  upgrade

# install build dependencies
RUN apk add --no-cache --virtual .build-deps python3 py3-pip

RUN apk add --no-cache --virtual udev git

# install required python packages
RUN pip3 install --upgrade pip
RUN pip3 install requests
RUN pip3 install python-dateutil
RUN pip3 install gitpython

# remove cache
RUN rm -rf /var/cache/apk/* /tmp/*

ENV CATBLOCKS=${CATBLOCKSREPO}
ENV CATROID=${CATROIDREPO}
ENV WORKDIR=${WORKDIR}

# copy python script to docker
COPY require/checker.py /checker.py

# cmd
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
