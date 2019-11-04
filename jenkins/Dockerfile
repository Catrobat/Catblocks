FROM node:12-alpine

# install python
RUN apk add --update make cmake gcc g++ gfortran
RUN apk add --update python py-pip python-dev

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT docker-entrypoint.sh

CMD node
