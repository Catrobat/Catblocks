#!/bin/sh
#
: '
Catrobat Brick Support Checker Action
'

# Create directory where the Catroid and Catblocks projects should be cloned to
mkdir $WORKDIR && cd $WORKDIR

git clone $CATBLOCKS
git clone $CATROID

# copy the json-files to the working directory
cp -r Catblocks/src/library/js/blocks/categories categories

# run checker & send report
python3 /checker.py "$WORKDIR" "$1"