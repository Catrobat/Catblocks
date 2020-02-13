#!/bin/sh

: '
Catblocks jest testing github action entrypoint

This file is reponsible to run all steps for testing your code
It gets copied during the container build and executed on start

Github action pushes all the neccessary information into the system variables
For example, we use the GITHUB_SHA hash to checkout the commit,
  which has triggered the action.

'

# Prepare everything for repository checkout
mkdir -p /home/jest/
cd /home/jest/

# clone repository
git clone "https://github.com/Catrobat/Catblocks.git"
cd Catblocks/ 

# fetch some information from git
COMMIT="$GITHUB_SHA"
BRANCH=$(git name-rev "$COMMIT" | cut -d' ' -f2)
AUTHOR=$(git show -s --format=%an "$COMMIT")
TIMESTAMP=$(git show -s --format=%cd --date=format:%Y%m%d-%H%M%S "$COMMIT")

git fetch origin "$COMMIT"
git checkout "$COMMIT"

# install everything properly
yarn install

# run test
yarn run test
REPORT="rep_${BRANCH}_${COMMIT}_${AUTHOR}_${TIMESTAMP}.html"
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

