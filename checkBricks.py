import os
ignored = [ "IfThenLogicEndBrick.xml",
            "IfLogicElseBrick.xml",
            "IfLogicEndBrick.xml",
            "LoopEndBrick.xml",
            "LoopEndlessBrick.xml",
            "WhenBackgroundChangesBrick.xml",
            "WhenBounceOffBrick.xml",
            "WhenClonedBrick.xml",
            "WhenConditionBrick.xml",
            "WhenBrick.xml",
            "WhenConditionBrick.xml",
            "WhenTouchDownBrick.xml",
            "WhenStartedBrick.xml",
            "SetTextBrick.xml",
            "BroadcastReceiverBrick.xml",
            "WhenNfcScript.xml"
          ]

def main():
    print("Displaying differences between: ")
    count_exists = 0
    count_non_exists = 0
    count_ignored = 0
    catblocks = os.listdir(os.getcwd() + "/BlockLibrary/")
    with open("bricklist.txt") as f:
        content = f.readlines()
    catroid = [x.strip() for x in content]
    
    for brick in ignored:
        if brick in catroid:
            catroid.remove(brick)
            count_ignored += 1
        else: print(brick)
    catroid.sort()

    print("----------CATBLOCKS----------")
    for block in catblocks:
        if not block in catroid:
            print(block + " does not exist in Catroid")
    print("----------CATROID----------")
    for block in catroid:
        if not block in catblocks:
            print(block + " does not exist in Catblocks")
            count_non_exists += 1
        else: count_exists += 1


    print("----------SUMMARY----------")
    print("Correctly named blocks: " + str(count_exists))
    print("Wrong named blocks: " + str(count_non_exists))
    print("Ignored blocks: " + str(count_ignored))


if __name__ == "__main__":
    main()