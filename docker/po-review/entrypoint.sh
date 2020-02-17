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

REPOURL="https://github.com/Catrobat/Catblocks.git"
COMMIT="{{COMMIT}}"

# just for safety, check if we the github action has
#   replaced the COMMIT sha properly
if [ -z "$COMMIT" ]
then
  COMMIT="develop"
fi

# clone repository and checkout po-review commit
git clone "$REPOURL" "$REPONAME"
cd "$REPONAME"

git fetch origin "$COMMIT"
git checkout "$COMMIT"

# install everything properly
yarn install

# run share production build
yarn run share:prod

exit 0