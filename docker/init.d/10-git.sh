#!/bin/sh

if [ -z "$CATROOT" ]
then
  CATROOT="/home/catblocks/"
  export CATROOT
fi

cd "$CATROOT"
git clone "https://github.com/Catrobat/Catblocks.git"
