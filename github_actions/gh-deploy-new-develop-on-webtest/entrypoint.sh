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

if git show-ref --quiet refs/remotes/origin/${BRANCH}; then
    git fetch origin ${BRANCH}
    git checkout ${BRANCH}
    git merge origin develop
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
RETVALUE=$(($? + $RETVALUE))
curl -i -H "Authorization: token ${GITTOKEN}" -X POST -d '{ "title": "Catblocks: New Release", "body": "Automatic deploy of new Catblocks version", "head": "gh_catblocks_automatic_deploy_develop", "base": "develop" }' https://api.github.com/repos/Catrobat/Catroweb/pulls | grep -q "201 Created"
RETVALUE=$(($? + $RETVALUE))

exit $RETVALUE