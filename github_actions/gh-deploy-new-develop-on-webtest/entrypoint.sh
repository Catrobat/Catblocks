#!/bin/sh

: 'Catblocks create PR for develop after succesful merge'

# go to checkout@v2 folder
cd /github/workspace/

GITTOKEN="$1"

git reset --hard
git clean -df
git fetch origin develop
git checkout develop

# build release
yarn install
yarn clean
yarn release:build
RETVALUE="$?"

# create release folder and move it up one level
mv ./release ./../release
cd ..

GITTOKEN="$1"
BRANCH="gh_catblocks_automatic_deploy_develop"
git clone https://github.com/Catrobat/Catroweb.git
cd Catroweb/

if git show-ref --quiet refs/heads/${BRANCH}; then
    git fetch ${BRANCH}
    git checkout ${BRANCH}
else
    git checkout -b ${BRANCH}
    git push -u origin ${BRANCH}
fi

rm -rf assets/catblocks/*
rsync -a ./../release/* assets/catblocks/
rm -rf ./../release

git config user.email "action@github.com"
git config user.name "catrobat-github-bot"
git add ./assets/catblocks/.
git commit -m "CATBLOCKS: update of catblocks folder"
git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/Catrobat/Catroweb.git" ${BRANCH}
RETVALUE= $(($? + $RETVALUE))
GITHUB_TOKEN="$GITTOKEN"
hub pull-request -b develop -h gh_catblocks_automatic_deploy -m "CATBLOCKS: gh-action new Catblocks publish"
RETVALUE= $(($? + $RETVALUE))

exit $RETVALUE