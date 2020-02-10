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
yarn run toolbox
yarn run translate

# run test
yarn run playground:test
REPORT="report_$(date +%Y%m%d-%H%M%S).html"
mv ./jest_html_reporters.html $REPORT

# push report
TOKEN="$1"
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add $REPORT
git commit -m "Add test report" -a 

remote_repo="https://${GITHUB_ACTOR}:${TOKEN}@github.com/Catblocks.git"
git push "https://${GITHUB_ACTOR}:${TOKEN}@github.com/Catblocks.git" "${GITHUB_SHA}:gh-pages"

