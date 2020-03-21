#!/bin/sh

: '
Catblocks jest runner action
@author andreas.karner@student.tugraz.at
'

set -e

# install catblocks and run tests
yarn install
yarn run test