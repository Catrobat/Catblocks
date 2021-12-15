# This script automatically compares supported Catroid and Catblocks bricks and sends the report with a given slack webhook.
# Required Parameters: Working Directory of Catblocks & Catroid Project and a Slack Webhook.

import json
import os
import sys
import requests
import git
import datetime
import dateutil.parser
import _jsonnet
import re
import xml.etree.ElementTree as ET

path = ''

# if some files should be excluded for the checks, add them here
excluded_js_files = ['index.js']

excluded_java_bricks = ['Brick', 'ParameterizedEndBrick', 'UserDefinedBrick', 'UserDefinedReceiverBrick']

map_bricks_scripts = [
    ('WhenBrick', 'WhenScript'),
    ('WhenConditionBrick', 'WhenConditionScript'),
    ('WhenBackgroundChangesBrick', 'WhenBackgroundChangesScript'),
    ('WhenBounceOffBrick', 'WhenBounceOffScript'),
    ('BroadcastReceiverBrick', 'BroadcastScript'),
    ('WhenClonedBrick', 'WhenClonedScript'),
    ('WhenTouchDownBrick', 'WhenTouchDownScript'),
    ('WhenStartedBrick', 'StartScript'),
]

# Loads the bricks supported by Catblocks from the JSON data.
def loadCatblocksBricks():
    global path
    catblockPath = path + '/Catblocks/src/library/js/blocks/categories/'
    files = os.listdir(catblockPath)

    js_bricks = []

    for filename in files:
        if filename in excluded_js_files:
            continue

        filePath = catblockPath + filename
        f = open(filePath, 'r')
        jsContent = f.read()
        
        brickCategory = filename[:filename.find('.')]
        bricks = getBricksFromJsFileContent(jsContent)

        for brick in bricks:
            js_bricks.append((brick, brickCategory))

    return js_bricks

def getBricksFromJsFileContent(jsContent):
    startIndex = jsContent.index('{')
    trimmedJsContent = jsContent[startIndex:].strip().strip(';').replace('`', "'")
    jsonString = _jsonnet.evaluate_snippet('snippet', trimmedJsContent)
    jsonBricks = json.loads(jsonString)

    bricks = []
    for brick in jsonBricks:
        bricks.append(brick)
    return bricks


# Loads the bricks supported by Catroid by searching looking at the imports of CategoryBricksFactory.
def loadCatroidBricks():
    global path
    base_dir = path
    factory_path = base_dir + '/Catroid/catroid/src/main/java/org/catrobat/catroid/ui/fragment/CategoryBricksFactory.kt'
    file = open(factory_path, 'r')
    factory_file_lines = file.read().split('\n')
    java_bricks = []
    for line in factory_file_lines:
        if line.startswith('import org.catrobat.catroid.content.bricks.'):
            last_dot = line.rindex('.') + 1
            java_brick = line[last_dot:]
            if java_brick not in excluded_java_bricks:
                java_category = getCategoryForJavaBrick(java_brick)
                java_bricks.append((java_brick, java_category))
    return java_bricks

def getCategoryForJavaBrick(blockname):
    global path
    brickDefinitionPath = path + '/Catroid/catroid/src/main/java/org/catrobat/catroid/content/bricks'
    brickClasses = os.listdir(brickDefinitionPath)

    for brickClassFile in brickClasses:
        if not brickClassFile.startswith(blockname):
            continue
    
        classFilePath = brickDefinitionPath + '/' + brickClassFile
        brickLayout = getLayoutFromClassFile(classFilePath)
        if brickLayout is not None:
            category = getCategoryFromLayout(brickLayout)
            return category
    return None

def getLayoutFromClassFile(classFilePath):
    file = open(classFilePath, 'r')
    classFileContent = file.readlines()

    for line in classFileContent:
        if line.find('R.layout.') != -1:
            line = line.strip()
            line = re.sub('.*\\.', '', line)
            line = line.strip(';')
            return line
    return None

def getCategoryFromLayout(layoutName):
    try:
        global path
        layoutFilePath = path + '/Catroid/catroid/src/main/res/layout/' + layoutName + ".xml"
        
        if not os.path.exists(layoutFilePath):
            return None

        layoutXml = ET.parse(layoutFilePath)
        style = layoutXml.find('org.catrobat.catroid.ui.BrickLayout').attrib['style']

        style = re.sub('.*\\BrickContainer.', '', style)
        style = re.sub('\\..*', '', style)
        return style

    except:
        return None


def compareBricks(java_bricks, js_bricks):
    in_java_not_js = []

    for java_brick in java_bricks:
        jsBrick = getJsBrick(java_brick[0], js_bricks)
        if jsBrick is None:
            in_java_not_js.append((java_brick[0], java_brick[1], None))
        elif java_brick[1] is not None and java_brick[1].lower() != jsBrick[1].lower():
            in_java_not_js.append((java_brick[0], java_brick[1], jsBrick[1]))

    return in_java_not_js

def getJsBrick(brickToFind, bricks):
    mappedName = brickToFind
    for catroidToCatblocks in map_bricks_scripts:
        if brickToFind == catroidToCatblocks[0]:
            mappedName = catroidToCatblocks[1]
            break
    
    for brick in bricks:
        if brick[0] == mappedName:
            return brick

    return None


def generateBlockMessage(missing_bricks):
    msgMissing = ''
    msgWrongCategory = ''
    for brick in missing_bricks:
        if brick[2] is None:
            if brick[1] is not None:
                msgMissing += '{} ({})\n'.format(brick[0], brick[1].lower())
            else:
                msgMissing += '{}\n'.format(brick[0])
        else:
            if brick[1] is not None:
                msgWrongCategory += '{} ({} -> {})\n'.format(brick[0], brick[2].lower(), brick[1].lower())

    msgWrongCategory = msgWrongCategory.strip()
    if msgWrongCategory != '':
        msgWrongCategory = '*Bricks in wrong category*:\n' + msgWrongCategory

    msgMissing = msgMissing.strip();
    if msgMissing != '':
        msgMissing = '*Missing Bricks in Catblocks*:\n' + msgMissing

    return msgMissing + '\n\n' + msgWrongCategory


def loadSupportedCatroidLanguages():
    global path
    base_dir = path + '/Catroid/catroid/src/main/res/'
    repo = git.Git(path + '/Catroid')
    folders = os.listdir(base_dir)
    languages = {}
    for folder in folders:
        if folder.startswith('values-') or folder == 'values':
            xml_file = base_dir + folder + '/strings.xml'
            if os.path.exists(xml_file):
                result = repo.log('-1', '--format="%cI"', xml_file)
                
                map_folder = folder
                if folder == 'values':
                    map_folder = 'values-en'
                languages[map_folder] = dateutil.parser.parse(result.strip('"'))
    return languages


def loadSupportedCatblocksLanguages():
    global path
    base_dir = path + '/Catblocks/i18n/catroid_strings/'
    repo = git.Git(path + '/Catblocks')
    folders = os.listdir(base_dir)
    languages = {}
    for folder in folders:
        xml_file = base_dir + folder + '/strings.xml'
        if os.path.exists(xml_file):
            result = repo.log('-1', '--format="%cI"', xml_file)
            languages[folder] = dateutil.parser.parse(result.strip('"'))
        else:
            languages[folder] = None
    return languages


def compareLanguageSupport(catroid_languages, catblocks_languages):
    language_updates = []
    for language in catroid_languages:
        if language in catblocks_languages:
            if catblocks_languages[language] is None or catblocks_languages[language] < catroid_languages[language]:
                language_updates.append(language)
        else:
            language_updates.append(language + ' [new]')
    return language_updates


def generateLanguageMessage(updated_languages):
    updated_languages.sort()
    msg = '*Automatically Updated Languages*:\n'
    for lang in updated_languages:
        msg += lang.replace('values-', '') + ', '
    return msg.strip().strip(',')

def sendSlackMessage(webhook, message):
    json_data = {'text': message}
    requests.post(webhook, json=json_data)

def fetchLanguages():
    global path
    base_dir = path + '/Catroid/catroid/src/main/res/'
    copy_dir = path + '/Catblocks/i18n/catroid_strings/'
    repo = git.Git(path + '/Catblocks')
    git.Git(path + '/Catroid')
    folders = os.listdir(base_dir)
    languages = {}
    for folder in folders:
        xml_file = base_dir + folder + '/strings.xml'
        if os.path.exists(xml_file):
            if folder == 'values':
                folder = folder + '-en'
            cat_blocks_xml = copy_dir + folder + '/strings.xml'
            os.replace(xml_file, cat_blocks_xml)
        else:
            languages[folder] = None



# Requires the following Args: 
#   [1] Path to the parent folder of Catblocks & Catroid project
#   [2] Slack Webhook URL
def main():
    global path
    path = sys.argv[1].rstrip('/')
    slack_webhook = sys.argv[2]
    try:
        slack_msg = ""
        send_msg = False

        # load bricks and compare them
        java_bricks = loadCatroidBricks()
        js_bricks = loadCatblocksBricks()
        in_java_not_js = compareBricks(java_bricks, js_bricks)

        # generate slack report for bricks if necessary
        if in_java_not_js is not None and len(in_java_not_js) > 0:
            slack_msg += generateBlockMessage(in_java_not_js)
            send_msg = True

        # compare languages
        catroid_languages = loadSupportedCatroidLanguages()
        catblocks_languages = loadSupportedCatblocksLanguages()
        language_updates = compareLanguageSupport(catroid_languages, catblocks_languages)

        if language_updates is not None and len(language_updates) > 0:
            fetchLanguages()
            slack_msg += '\n\n' + generateLanguageMessage(language_updates)
            send_msg = True

        if send_msg:
            sendSlackMessage(slack_webhook, slack_msg.strip())
        else:
            slack_msg = "Everything is up to date."
            sendSlackMessage(slack_webhook, slack_msg.strip())
            
        print(slack_msg)
    except:
        print(slack_msg)
        slack_msg = "Failed to execute checker.py"
        sendSlackMessage(slack_webhook, slack_msg.strip())

if __name__ == '__main__':
    main()
