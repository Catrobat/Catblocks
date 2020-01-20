#!/bin/sh
INIT="./init.d/"

if [ -d "$INIT" ]
then
  echo "Found init folder, fetching executeable files"

  for SCRIPT in $(ls "$INIT"*".sh")
  do
    echo "Run: ""$SCRIPT"
    sh $SCRIPT
    echo "Finsihed script: ""$SCRIPT"
  done
else
  echo "Does not find init.d/ folder inside root folder"
  exit -1
fi

