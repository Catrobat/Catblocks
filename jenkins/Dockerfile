FROM archlinux/base:latest

# update first
RUN pacman -Syu --noconfirm

# install stuff we need
RUN pacman -S base-devel \
  python2 \
  nodejs \
  npm \
  git \
  # dependencies for google chrome from AUR
  alsa-lib \ 
  gtk3 \
  libcups \
  libxss \
  libxtst \
  nss \
  jre-openjdk-headless \
  procps \
  --noconfirm

# install http-server
RUN npm install -g http-server

# link python2 as python
RUN ln /usr/bin/python2 /usr/bin/python

# for arch we use the downloaded chromemium from puppeteer
#ENV DCONTAINER catblocks:v1
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1

# setup entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT docker-entrypoint.sh

# add catblocks user
RUN useradd -ms /bin/bash catblocks
USER catblocks
WORKDIR /home/catblocks

CMD /bin/sh