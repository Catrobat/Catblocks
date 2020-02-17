#!/bin/sh

: '
Catblocks po-review container entrypoint.sh template file
@author andreas.karner@student.tugraz.at

This script is mainly used as template
  during the github action, we will set the
  COMMIT variable with the sha from the pull request
  So please do not remove {{COMMIT}} without changing the cation as well

'

# define some global script variables
REPOROOT="/"
REPONAME="Catblocks"
POROOT="${REPOROOT}${REPONAME}/test/po-review/"
POHTML="${REPOROOT}${REPONAME}/src/html/po-review.html"

REPOURL="https://github.com/Catrobat/Catblocks.git"
REPOCOMMIT="{{COMMIT}}"
REPOBRANCH="{{BRANCH}}"

# clone repository and checkout po-review commit
git clone "$REPOURL" "$REPONAME"
cd "$REPONAME"

git fetch origin "$COMMIT"
git checkout "$COMMIT"

# install everything properly
yarn install

# before we spin up the po-review server, we need to fix the program path
if [ -d "${POROOT}${REPOBRANCH}/" ]
then
  echo "Use po-review program from branch folder"
  sed -i "s/{{po-folder}}/${REPOBRANCH}/g" "$POHTML"
else
  echo "Use po-review program from default folder"
  sed -i "s/{{po-folder}}/default/g" "$POHTML"
fi

# run share production build
yarn run share:po-review

exit 0