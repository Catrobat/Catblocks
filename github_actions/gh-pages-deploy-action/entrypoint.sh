#!/bin/sh

: '
Catblocks deploy testpage action
'

PRNUMBER=$(python3 /PREvaluator.py)

# go to checkout@v2 folder
cd /github/workspace/

# build render
yarn install
yarn clean
yarn render:build
RETVALUE="$?"

mv ./dist ./../dist

# push token
GITTOKEN="$1"
git reset --hard
git clean -df
git fetch origin gh-pages
git checkout gh-pages
rm ./develop -rf ||:
mv ./../dist ./develop

COMMITMSG="Deploy: Merged Pull Request #${PRNUMBER}"

git config user.email "action@github.com"
git config user.name "GitHub Action"
git add ./develop
git commit -m $COMMITMSG

git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/Catrobat/Catblocks.git" "gh-pages"

exit $RETVALUE