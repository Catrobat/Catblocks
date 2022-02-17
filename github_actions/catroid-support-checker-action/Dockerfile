FROM ubuntu

ARG CATBLOCKSREPO="Catrobat/Catblocks"
ARG CATROIDREPO="https://github.com/Catrobat/Catroid.git"
ARG WORKDIR="/checker/"

# install required packages
RUN apt update
RUN apt install python3 python3-pip --assume-yes
RUN apt install build-essential --assume-yes
RUN apt install git --assume-yes
RUN apt install curl --assume-yes

# install required python packages
RUN pip3 install --upgrade pip
RUN pip3 install requests
RUN pip3 install python-dateutil
RUN pip3 install gitpython
RUN pip3 install jsonnet

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
