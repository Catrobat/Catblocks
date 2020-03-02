#!/bin/sh

: '
Catblocks jest testing github action entrypoint
@author andreas.karner@student.tugraz.at

This file is reponsible to run all steps for testing your code
It gets copied during the container build and executed on start

Github action pushes all the neccessary information into the system variables
For example, we use the GITHUB_SHA hash to checkout the commit,
  which has triggered the action.
In addition, github action mounts the checkout@v2 repository to /github/workspace/

'

# change directory
cd /github/workspace/

# install everything properly
yarn install

# run test
yarn run test
RETVALUE=$?

# prepare report
GITTOKEN="$1"
COMMIT="$GITHUB_SHA"
BRANCH=${GITHUB_REF##*/}
AUTHOR="$GITHUB_ACTOR"
TIMESTAMP=$(git show -s --format=%cd --date=format:%Y%m%d-%H%M%S "$COMMIT")

REPORT="rep_${BRANCH}_${COMMIT}_${AUTHOR}_${TIMESTAMP}.html"
mv ./jest_html_reporters.html $REPORT


# do some black magic (please fix this code later)
mv $REPORT ./../
git reset --hard
git clean -df
git fetch origin gh-pages
git checkout gh-pages
mv ./../$REPORT ./reports/

# push report to gh-pages branch
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add ./reports/$REPORT
git commit -m "Add test report"

git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/Catrobat/Catblocks.git" "gh-pages"

exit $RETVALUE
