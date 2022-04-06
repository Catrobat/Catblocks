#!/bin/sh
#
: '
Catrobat Brick Support Checker Action
'

GITTOKEN="$2"
LANGUAGE_UPDATE_FLAG="/langupdate.txt"
BRANCH="BLOCKS-MAINTENANCE-language_update"

# Create directory where the Catroid and Catblocks projects should be cloned to
mkdir $WORKDIR && cd $WORKDIR

git clone "https://github.com/${CATBLOCKS}.git"
git clone $CATROID

cd Catblocks/
git config user.email "action@github.com"
git config user.name "Catblocks GitHub Action"

if git show-ref --quiet refs/remotes/origin/${BRANCH}; then
    git fetch origin ${BRANCH}
    git checkout ${BRANCH}
    git merge origin develop
    echo '>> Existing branch found!'
else
    git checkout -b ${BRANCH}
    git push -u origin ${BRANCH}
    echo '<< New branch created!'
fi

cd ..

# run checker & send report
rm -f $LANGUAGE_UPDATE_FLAG
python3 /checker.py "$WORKDIR" "$1"
RETVALUE="$?"

# push language updates to repository and create PR
# checker.py creates a file if the PR is necessary
if test -f $LANGUAGE_UPDATE_FLAG; then
    echo '>> Language update found! PR will be created.'

    cd Catblocks/

    git add i18n/catroid_strings/
    git commit -m 'BLOCK-MAINTENANCE update languages'
    git push "https://${GITHUB_ACTOR}:${GITTOKEN}@github.com/${CATBLOCKS}.git" $BRANCH

    curl -s -o /dev/null -w "%{http_code}" -i -H "Authorization: token ${GITTOKEN}" -X POST -d '{ "title": "BLOCK-MAINTENANCE update languages", "body": "Languages automatically fetched from Catroid.", "head": "'${BRANCH}'", "base": "develop" }' https://api.github.com/repos/$CATBLOCKS/pulls | tac | tac | grep -qsE "200|201|422"
    RETVALUE=$(($? + $RETVALUE))
fi

echo $RETVALUE
exit $RETVALUE