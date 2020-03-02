#!/bin/sh

: '
@file Entrypoint file for po-review docker container
@author andreas.karner@student.tugraz.at
@description This file will clone the catblocks repository
  and checkout the pr commit for po-review. This is done
  via replacing the {{COMMIT}} string with associated pr commit hash.
  
  It will render all programs which are passed via:
    * args -> program url, either https://... or just the program hash
    * docker folder mounting -> mount local program folder to /test/programs/
'

# define some global script variables
POCOMMIT="{{COMMIT}}"
# define root folder for programs to render
PROGROOT="${REPOHOME}/dist/assets/programs/"

# clone repository and checkout po-review commit
cd "${WORKHOME}"
git clone "$REPO" "$REPONAME"
cd "${REPOHOME}"
git fetch origin "$POCOMMIT"
git checkout "$POCOMMIT"

# install everything properly
yarn install
yarn run render:build


# prepare po-review program directory
echo "Prepare folder structure for po-review programs"
rm -rf "${PROGROOT}"
mkdir -p "${PROGROOT}"

# copy test programs if mounted
if [ -d "$TESTDIR" ]
then
  echo "Copy all programs to test into po-review folder"
  cp -vr "${TESTDIR}"* "${PROGROOT}"
fi

# download program from share if defined in args
if [ ! -z "${1+x}" ]
then
  echo "Received program to download from share in argument: ${1}"
  PROGHASH="${1##*/}"
  echo "Fetch program hash ${PROGHASH}"
  wget "${SHAREROOT}${PROGHASH}.catrobat" -O "${PROGROOT}${PROGHASH}.zip"  
fi

echo "Extract all program archives"
cd "${PROGROOT}"
for FILE in $(ls * | grep -E '\.zip|\.catrobat')
do
  echo "Proces ${FILE} started"
  mkdir -p "${FILE%.*}/"
  unzip "$FILE" -d  "${FILE%.*}/"
  rm "$FILE"
  echo "Process ${FILE} done"
done

# spin up web server
cd "${REPOHOME}/dist"
python3 -m http.server $SERVERPORT

exit 0