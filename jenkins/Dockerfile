FROM node:12-alpine

# install python
RUN apk add --update make cmake gcc g++ gfortran
RUN apk add --update python py-pip python-dev

# install chromeium (https://pkgs.alpinelinux.org/package/edge/community/x86_64/chromium)
RUN apk add --update chromium

# install http-server
RUN npm install -g http-server

# set ENV to indicate we are catblocks container
ENV DCONTAINER catblocks:v1
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT docker-entrypoint.sh

CMD node
