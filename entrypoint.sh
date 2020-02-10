#!/bin/sh -l

# Prepare everything for repository checkout
mkdir -p /home/jest/
cd /home/jest/

# clone and install repository
git clone https://github.com/Catrobat/Catblocks.git
cd Catblocks/
git checkout BLOCKS-53
yarn install
yarn run toolbox
yarn run translate

# run test
# yarn playground:test
yarn run playground:test

echo "Input params was:""$1"