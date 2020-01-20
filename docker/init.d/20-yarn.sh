#!/bin/sh

if [ -z "$ROOT" ]
then
  ROOT="/home/akarner/tulocal/catrobat/Catblocks/"
  export ROOT
fi


cd "$ROOT"
yarn install
