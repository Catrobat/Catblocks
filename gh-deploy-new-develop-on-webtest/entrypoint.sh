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
$RETVALUE=$?

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
fi

rm -rf Catroweb/assets/catblocks/*
mv ./../release/* ./assets/catblocks/

git config user.email "action@github.com"
git config user.name "GitHub Action"
git add ./assets/catblocks/
git commit -m "automatic deploy of new catblocks develop branch"
git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/Catrobat/Catroweb.git" "gh_catblocks_automatic_deploy"
hub pull-request -b develop -h gh_catblocks_automatic_deploy -m "gh-action new Catblocks publish"

exit $RETVALUE