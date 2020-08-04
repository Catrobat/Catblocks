# This script automatically compares supported Catroid and Catblocks bricks and sends the report with a given slack webhook.
# Required Parameters: Working Directory of Catblocks & Catroid Project and a Slack Webhook.

import json
import os
import sys
import requests
import git
import datetime
import dateutil.parser


# if some files should be excluded for the checks, add them here
excluded_js_files = ['index.js']

excluded_java_bricks = ['Brick', 'ParameterizedEndBrick']

map_bricks_scripts = [
    ('WhenScript', 'WhenBrick'),
    ('WhenConditionScript', 'WhenConditionBrick'),
    ('WhenBackgroundChangesScript', 'WhenBackgroundChangesBrick'),
    ('WhenBounceOffScript', 'WhenBounceOffBrick'),
    ('BroadcastScript', 'BroadcastReceiverBrick'),
    ('WhenClonedScript', 'WhenClonedBrick'),
    ('WhenTouchDownScript', 'WhenTouchDownBrick'),
    ('StartScript', 'WhenStartedBrick'),
]


def convertJavascriptStringToJsonString(javascript_string):
    last_whitespace = 0
    index = 0
    json_string = ''
    for char in javascript_string:
        if char == ' ':
            last_whitespace = index
        if char == ':':
            object_name = javascript_string[last_whitespace + 1: index]
            json_string = json_string[:last_whitespace] + '\"' + object_name + '\"'
        json_string = json_string + char
        index = index + 1
    return json_string


# Loads the bricks supported by Catblocks from the JSON data.
def loadCatblocksBricks(base_dir):
    path = base_dir + '/categories/'
    files = os.listdir(path)

    js_bricks = []

    for filename in files:
        if filename in excluded_js_files:
            continue

        filename = path + filename
        f = open(filename, 'r')
        content = f.read()
        javascript_string = content[content.find('{'):content.rfind(';')].replace('`', '"').replace('\'', '\"')
        json_string = convertJavascriptStringToJsonString(javascript_string)
        parsed_json = json.loads(json_string)

        for brick_name in parsed_json:
            js_bricks.append(brick_name)

    return js_bricks


# Loads the bricks supported by Catroid by searching looking at the imports of CategoryBricksFactory.
def loadCatroidBricks(base_dir):
    factory_path = base_dir + '/Catroid/catroid/src/main/java/org/catrobat/catroid/ui/fragment/CategoryBricksFactory.java'
    file = open(factory_path, 'r')
    factory_file_lines = file.read().split('\n')
    java_bricks = []
    for line in factory_file_lines:
        if line.startswith('import org.catrobat.catroid.content.bricks.'):
            last_dot = line.rindex('.') + 1
            line_end = line.rindex(';')
            java_brick = line[last_dot: line_end]
            if java_brick not in excluded_java_bricks:
                java_bricks.append(java_brick)
    return java_bricks


# Compares the two arrays
def compareBricks(java_bricks, js_bricks):
    in_js_not_java = []
    in_java_not_js = []

    for java_brick in java_bricks:
        if java_brick not in js_bricks:
            in_java_not_js.append(java_brick)

    for js_brick in js_bricks:
        if js_brick not in java_bricks:
            in_js_not_java.append(js_brick)

    for entry in map_bricks_scripts:
        if entry[0] in js_bricks and entry[1] in in_java_not_js:
            in_java_not_js.remove(entry[1])

    return in_java_not_js, in_js_not_java


# Builds the report for the missing bricks
def generateBlockMessage(missing_bricks, categories):
    msg = '*Missing Bricks in Catblocks*:\n'
    for brick in missing_bricks:
        category = getCategoryForJavaBrick(brick, categories)
        if category is not None:
            msg += brick + ' [' + category + ']\n'
        else:
            msg += brick + '\n'
    return msg.strip()


# Loads the .java-file where bricks are but in categories.
# First the import-statements are removed
def loadJavaCategoryClass(base_dir):
    path = base_dir + '/Catroid/catroid/src/main/java/org/catrobat/catroid/ui/fragment/CategoryBricksFactory.java'
    f = open(path, 'r')
    content = f.read()
    content = content[content.find("public class"):]
    return content


# Searches the CategoryBricksFactory for the line where the brick is put in the
# category list
def getCategoryForJavaBrick(blockname, category_class):
    for line in category_class:
        if blockname in line:
            if '.add' in line:
                try:
                    return line.split('.')[0].replace('List', '').strip()
                except:
                    return None
    return None


def loadSupportedCatroidLanguages(work_dir):
    base_dir = work_dir + 'Catroid/catroid/src/main/res/'
    repo = git.Git(work_dir + 'Catroid')
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


def loadSupportedCatblocksLanguages(work_dir):
    base_dir = work_dir + 'Catblocks/i18n/catroid_strings/'
    repo = git.Git(work_dir + 'Catblocks')
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
    msg = '*Updated Languages*:\n'
    for lang in updated_languages:
        msg += lang.replace('values-', '') + ', '
    return msg.strip().strip(',')

def sendSlackMessage(webhook, message):
    json_data = {'text': message}
    requests.post(webhook, json=json_data)


# Requires the following Args: 
#   [1] Path to the parent folder of Catblocks & Catroid project
#   [2] Slack Webhook URL
def main():
    path = sys.argv[1]
    slack_webhook = sys.argv[2]
    try:
        slack_msg = ""
        send_msg = False

        # load bricks and compare them
        java_bricks = loadCatroidBricks(path)
        js_bricks = loadCatblocksBricks(path)
        in_java_not_js, in_js_not_java = compareBricks(java_bricks, js_bricks)

        # generate slack report for bricks if necessary
        if in_java_not_js is not None and len(in_java_not_js) > 0:
            category_class = loadJavaCategoryClass(path).splitlines()
            slack_msg += generateBlockMessage(in_java_not_js, category_class)
            send_msg = True

        # compare languages
        catroid_languages = loadSupportedCatroidLanguages(path)
        catblocks_languages = loadSupportedCatblocksLanguages(path)
        language_updates = compareLanguageSupport(catroid_languages, catblocks_languages)

        if language_updates is not None and len(language_updates) > 0:
            slack_msg += '\n\n' + generateLanguageMessage(language_updates)
            send_msg = True

        if send_msg:
            sendSlackMessage(slack_webhook, slack_msg.strip())
        else:
            slack_msg = "Everything is up to date."
            sendSlackMessage(slack_webhook, slack_msg.strip())
    except:
        slack_msg = "Failed to execute checker.py"
        sendSlackMessage(slack_webhook, slack_msg.strip())

if __name__ == '__main__':
    main()
