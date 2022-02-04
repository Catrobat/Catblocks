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

GITTOKEN="$1"
RETVALUE="$?"
COMMITMSG="Automatically language update."

git config user.email "action@github.com"
git config user.name "GitHub Action"
git add i18n/catroid_strings/
git commit -m $COMMITMSG

git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/Catrobat/Catblocks.git" "gh-pages"

exit $RETVALUE