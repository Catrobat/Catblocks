# This script automatically compares supported Catroid and Catblocks bricks and sends the report with a given slack webhook.
# Required Parameters: Working Directory of Catblocks & Catroid Project and a Slack Webhook.

import json
import os
import sys
import requests

# if some files should be excluded for the checks, add them here
excluded_js_files = ['index.js']
excluded_java_files = ['Brick.java', 'BrickBaseType.java', 'BroadcastMessageBrick.java', 'CompositeBrick.java', 'ScriptBrick.java',
  'UserVariableBrickInterface.java', 'BrickSpinner.java', 'FormulaBrick.java', 'ScriptBrickBaseType.java', 'UserListBrick.java',
  'UserVariableBrick.java', 'UserVariableBrickWithFormula.java', 'VisualPlacementBrick.java']
excluded_js_bricks = ['WhenClonedScript', 'StartScript', 'WhenScript', 'WhenTouchDownScript', 'BroadcastScript', 'WhenConditionScript',
  'WhenBounceOffScript', 'WhenBackgroundChangesScript']


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
    json_str = content[content.find('{'):content.rfind(';')].replace('`', '"')
    #print(json_str)
    parsed_json = json.loads(json_str)

    for brick_name in parsed_json:
      if brick_name in excluded_js_bricks:
        continue
      
      js_bricks.append(brick_name)
  
  return js_bricks


# Loads the bricks supported by Catroid by searching in the bricks-folder of Catroid.
# Each .java-file is one brick.
def loadCatroidBricks(base_dir):
  path = base_dir + '/Catroid/catroid/src/main/java/org/catrobat/catroid/content/bricks/'
  files = os.listdir(path)
  
  java_bricks = []

  for filename in files:
    if not filename.endswith('.java') or filename in excluded_java_files:
      continue
    java_bricks.append(filename.replace('.java', ''))

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

  return in_java_not_js, in_js_not_java


# Builds the report for the missing bricks
def generateSlackMessage(missing_bricks, categories):
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


def sendSlackMessage(webhook, message):
  json_data = { 'text': message }
  requests.post(webhook, json=json_data)


# Requires the following Args: 
#   [1] Path to the parent folder of Catblocks & Catroid project
#   [2] Slack Webhook URL
def main():
  path = sys.argv[1]
  slack_webhook = sys.argv[2]

  java_bricks = loadCatroidBricks(path)
  js_bricks = loadCatblocksBricks(path)

  in_java_not_js, in_js_not_java = compareBricks(java_bricks, js_bricks)

  if in_java_not_js is not None and len(in_java_not_js) > 0:
    category_class = loadJavaCategoryClass(path).splitlines()
    slack_msg = generateSlackMessage(in_java_not_js, category_class)
    sendSlackMessage(slack_webhook, slack_msg)


if __name__ == '__main__':
  main()