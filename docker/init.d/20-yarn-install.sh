#!/bin/sh

if [ -z "$CATROOT" ]
then
  CATROOT="/home/catblocks/repo/Catblocks/"
  export CATROOT
fi

if [ -z "$MODE" ]
then
  MODE="development"
fi

cd "$CATROOT""/Catblocks"
yarn install "--""$MODE"
yarn translate
yarn playground:test
