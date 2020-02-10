#!/bin/sh -l

# Prepare everything for repository checkout
mkdir -p /home/jest/
cd /home/jest/

# clone and install repository
git clone https://github.com/Catrobat/Catblocks.git
cd Catblocks/

git fetch origin "$GITHUB_SHA"
git checkout "$GITHUB_SHA"

yarn install
yarn run toolbox
yarn run translate

# run test
yarn run playground:test
