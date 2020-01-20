#!/bin/sh

if [ -z "$CATROOT" ]
then
  CATROOT="/home/catblocks/repo/Catblocks/"
  export CATROOT
fi
cd "$CATROOT""/Catblocks"

if [ -z "$MODE" ]
then
  MODE="development"
fi

if [ "$MODE" = "development" ]
then
  yarn run share:build
  python3 -m http.server 8080
fi



