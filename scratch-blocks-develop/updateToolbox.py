#!/usr/bin/python

import os
import re
import sys

blockDict = {}
blockToColor = {}

curPath = os.getcwd()
libraryPath = os.path.normpath(os.path.join(curPath, "./../BlockLibrary/"))
blocklyLibraryPath = os.path.normpath(os.path.join(curPath, "./blocks_vertical/"))

HEADER = """/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.defaultToolbox');

goog.require('Blockly.Blocks');

/**
 * @fileoverview Provide a default toolbox XML.
 */"""


def initColors():
    blockToColor['motion']      = {'name':"\"%{BKY_CATEGORY_MOTION}\"",         'id':"\"motion\"", 'color':"\"#4C97FF\"", 'secondaryColour':"\"#3373CC\""}
    blockToColor['looks']       = {'name':"\"%{BKY_CATEGORY_LOOKS}\"",          'id':"\"looks\"",  'color':"\"#59C059\"", 'secondaryColour':"\"#59C059\""}
    blockToColor['sound']       = {'name':"\"%{BKY_CATEGORY_SOUND}\"",          'id':"\"sound\"",  'color':"\"#9966FF\"", 'secondaryColour':"\"#9966FF\""}
    blockToColor['event']       = {'name':"\"%{BKY_CATEGORY_EVENTS}\"",         'id':"\"events\"",  'color':"\"#FF661A\"", 'secondaryColour':"\"#CC9900\""}
    blockToColor['control']     = {'name':"\"%{BKY_CATEGORY_CONTROL}\"", 'id':"\"control\"", 'color':"\"#FFAB19\"", 'secondaryColour':"\"#CF8B17\""}
    blockToColor['pen']         = {'name':"\"%{BKY_CATEGORY_PEN}\"",    'color':"\"#0fBD8C\"",  'id':"\"sensing\"", 'secondaryColour':"\"#2E8EB8\""}
    blockToColor['data']        = {'name':"\"%{BKY_CATEGORY_VARIABLES}\"",   'color':"\"#FF6680\"",  'id':"\"operators\"", 'secondaryColour':"\"#389438\""}

def main():
    getData()
    initColors()
    createFile()
        
def getData():
    xmlFiles = [f for f in os.listdir(libraryPath) if os.path.isfile(os.path.join(libraryPath, f))]
    categoryFiles = [f for f in os.listdir(blocklyLibraryPath) if os.path.isfile(os.path.join(blocklyLibraryPath, f))]

    for category in categoryFiles:
        file_ = open(blocklyLibraryPath + "/" + category,"r")
        data = file_.readlines()

        category = category.replace(".js", "")
        blockDict[category] = []

        regex = re.compile(r'Blockly.Blocks\[.*')
        # use only one of the following lines, whichever you prefer
        filtered = [i for i in data if regex.search(i)]
        final = []
        for line in filtered:
            final.append(line.split("Blocks['")[1].split("'")[0]+".xml")
        for line in final:
            if xmlFiles.count(line) != 0:
                blockDict[category].append(line)

def createFile():
    output = open(blocklyLibraryPath + "/" + "default_toolbox.js", "w")
    output.write(HEADER + "\n")
    output.write("Blockly.Blocks.defaultToolbox = '<xml id=\"toolbox-categories\" style=\"display: none\">'\n")
    for category in blockToColor:
        if(len(blockDict[category]) != 0):
            output.write(" + '<category name=" + blockToColor[category]['name'] + " id= " + blockToColor[category]['id'] + " colour=" + blockToColor[category]['color'] + " secondaryColour=" + blockToColor[category]['secondaryColour'] + ">'\n")
            for filename in blockDict[category]:
                with open(libraryPath + "/" + filename, "r") as f:
                    # change BLOCK-030, just write the block definition
                    while True:
                        # prettfy lines
                        line = f.readline().replace("\n", "").replace("'", "\\\'")
                        line = re.sub(r'( id="\d*")?( x="\d*")?( y="\d*")?', '', line)
                        
                        if (line != '' and len(line) > 0):
                            output.write("  + '{0} </block>'\n".format(line))
                            break

            output.write(" + '</category>'\n")
    output.write("+ '</xml>';\n")

if __name__ == "__main__":
    main()