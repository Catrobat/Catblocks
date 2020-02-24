#!/bin/sh

: '
Catblocks docker image entrypoint
@author andreas.karner@student.tugraz.at


In the Dockerfile, we have defined the
  workingdir to be /home/catblocks
Further the repository is cloned to 
  /home/catblocks/Catblocks/
Repo and branch are set in env variables
  REPO -> "https://github.com/Catrobat/Catblocks.git"
  BRANCH -> "develop"
  WORKHOME -> "/home/catblocks/"
  RELREPOHOME -> "Catblocks"
  REPOHOME -> $WORKHOME$RELREPOHOME

'

# change into repository home
cd $REPOHOME

if [ "$SKIP_REPO_CHECK" != "1" ]
then
  # check if remote is newer
  git fetch origin $BRANCH
  CHANGES=$(git diff origin/$BRANCH | wc -l)
  if [ $CHANGES -gt 0 ]
  then
    echo "###########################################################"
    echo "### Remote got updated, please rebuild docker container ###"
    echo "###########################################################"

    # update local and rebuild stuff
    git pull origin $BRANCH
    yarn install
  fi
fi

# build your render project
echo "Build render target of repository"
yarn run render:build

# run all programs from /test/programs/
echo "Clean existing programs from webpage target"
rm -rf "${REPOHOME}/dist/assets/programs/"

echo "Copy all test programs into testing folder"
cp -r "$TESTDIR" "${REPOHOME}/dist/assets/programs/"

# extract all program archives
echo "Extract all program archives"
cd "${REPOHOME}/dist/assets/programs/"
for FILE in $(ls * | grep -E '\.zip|\.catrobat')
do
  echo "Proces ${FILE} started"
  mkdir -p "${FILE%.*}/"
  unzip "$FILE" -d  "${FILE%.*}/"
  rm "$FILE"
  echo "Process ${FILE} done"
done



# start http server
echo "Spinn you web server"
cd "${REPOHOME}/dist/"
python3 -m http.server 8080

exit 0