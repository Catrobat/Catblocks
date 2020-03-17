#!/bin/sh

: '
Catblocks deploy testpage action
'

set -e

# install catblocks and run tests
yarn install
yarn render:build