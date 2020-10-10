#!/bin/sh

: '
@file Entrypoint file for testing docker container
@description First we verfiy the local repository against the remote for updates.
  In case that the local repo is older, it will pull the remote BRANCH fresh.
  
  It will render all programs which are passed via:
    * args -> program url, either https://... or just the program hash
    * docker folder mounting -> mount local program folder to /test/programs/

  This entrypoint file uses various environment variables set by the Dockerfile
    {REPO, BRANCH, WORKHOME, REPONAME, REPOHOME, TESTDIR, SERVERPORT}
'

# define root folder for programs to render
PROGROOT="${REPOHOME}/dist/assets/programs/"

# check if remote repository is newer then local one
cd $REPOHOME
if [ "$SKIP_REPO_CHECK" != "1" ]
then
  git fetch origin $BRANCH
  CHANGES=$(git diff origin/$BRANCH | wc -l)
  if [ $CHANGES -gt 0 ]
  then
    echo "###########################################################"
    echo "### Remote got updated, please rebuild docker container ###"
    echo "###########################################################"

    # update local and rebuild stuff
    git pull origin $BRANCH

    echo "Rebuild fresh pulled repository"
    yarn install
    yarn run render:build
  fi
fi

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