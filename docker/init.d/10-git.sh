#!/bin/sh

if [ -z "$ROOT" ]
then
  ROOT="/home/akarner/tulocal/catrobat/Catblocks/"
  export ROOT
fi

cd "$ROOT"
git clone "https://github.com/Catrobat/Catblocks.git"
