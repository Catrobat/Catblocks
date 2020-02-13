#!/bin/sh -l

# Prepare everything for repository checkout
mkdir -p /home/jest/
cd /home/jest/

# clone repository
git clone "https://github.com/Catrobat/Catblocks.git"

# fetch and checkout the commit which triggered the actions
cd Catblocks/ 
git fetch origin "$GITHUB_SHA"
git checkout "$GITHUB_SHA"

# install everything properly
yarn install

# run test
yarn run test
REPORT="report_$(date +%Y%m%d-%H%M%S).html"
mv ./jest_html_reporters.html $REPORT

# push report
TOKEN="$1"

# do some black magic (please fix this code later)
mv $REPORT ./../
git reset --hard
git clean -df
git fetch gh-pages
git checkout gh-pages
mv ./../$REPORT ./reports/

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add ./reports/$REPORT
git commit -m "Add test report"

git push "https://${GITHUB_ACTOR}:${TOKEN}@github.com/Catrobat/Catblocks.git" "gh-pages"

