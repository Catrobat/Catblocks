#!/bin/sh
#
: '
Catrobat Brick Support Checker Action
'

# Create directory where the Catroid and Catblocks projects should be cloned to
mkdir $WORKDIR && cd $WORKDIR

git clone $CATBLOCKS
git clone $CATROID

# run checker & send report
python3 /checker.py "$WORKDIR" "$1"