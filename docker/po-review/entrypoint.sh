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

git fetch origin "$REPOCOMMIT"
git checkout "$REPOCOMMIT"

# install everything properly
yarn install

# before we spin up the po-review server, we need to fix the program path
if [ -d "${POROOT}${REPOBRANCH}/" ]
then
  echo "Use po-review program from branch folder"
  export PO_FOLDER="assets/po-review/${REPOBRANCH}/"
else
  echo "Use po-review program from default folder"
  export PO_FOLDER="assets/po-review/default/"
fi

# run share production build
yarn run render:build

# spin up web server
cd dist/
python3 -m http.server 8080

exit 0