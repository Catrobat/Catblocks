#!/bin/sh

: '
Catblocks jest runner action
'

set -e

# install catblocks and run tests
yarn install
yarn run test