package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class Parser {
    private List<Scene> sceneList;
    private Scene currentScene;
    private Object currentObject;
    private Script currentScript;
    private Stack<Block> conditionStack;
    private Stack<Block> blockStack;
    private Block currentCondBlock;


    public Parser() {
        sceneList = new LinkedList<>();
        conditionStack = new Stack<>();
        blockStack = new Stack<>();
    }

    private void parse(String line){

        line = "<" + line.split("<",2)[1];
        System.out.println(line);

        if(currentScene != null) {

            if(currentObject != null) {

                if(currentScript != null) {
                    if(line.contains("loopBricks") || line.contains("ifBranchBricks")){
                        currentCondBlock.workon1();
                    }
                    if(line.contains("elseBranchBricks")){
                        currentCondBlock.workon1();
                    }
                    if (line.contains("<brick ")) {
                        String name = line.split("type=\"")[1].replace("\">", "");
                        //just add to script
                        Block block = new Block(name);
                        blockStack.push(block);

                        if(currentCondBlock != null && currentCondBlock.isInSTMT1()) {
                            currentCondBlock.addSubblock(block);
                        }
                        else if(currentCondBlock != null && currentCondBlock.isInSTMT2()){
                            currentCondBlock.addSubblock2(block);
                        }
                        else{
                            currentScript.addBlock(block);
                        }
                        if (isConditionBrick(name)){
                            conditionStack.push(block);
                            currentCondBlock = block;
                        }
                    }
                }
                if (line.contains("<script ")) {
                    String name = line.split("type=\"")[1].replace("\">", "");
                    currentScript = new Script(name);
                    currentObject.addScript(currentScript);
                }
            }

            if (line.contains("<object ")) {
                System.out.println(line);
                String name = line.split("name=\"")[1].replace("\">", "");
                currentObject = new Object(name);
                currentScene.addObject(currentObject);
            }
        }

        if(line.equals("<scene>")) {
            currentScene = new Scene("");
            sceneList.add(currentScene);
        }

        if(line.equals("</block>")) {
            Block toBeRemoved = blockStack.pop();
            if(isConditionBrick(toBeRemoved.getName())){
                currentCondBlock = null;
                conditionStack.pop();
                if(conditionStack.size()>0){
                    currentCondBlock = conditionStack.lastElement();
                }
            }
        }
        if(line.equals("</script>")) {
            currentScript = null;
        }
        if(line.equals("</object>")) {
            currentObject = null;
        }
        if(line.equals("</scene>")) {
            currentScene = null;
        }
        if(line.contains("<name>") && currentScene.getName().equals("")){
            currentScene.setName(line.replaceAll("</?name>", ""));
        }
    }

    private boolean isConditionBrick(String name) {
        return name.equals("ForeverBrick") || name.equals("RepeatBrick") || name.equals("IfThenLogicBeginBrick") || name.equals("IfLogicBeginBrick");
    }


    public void parseFile(String inputFile) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(inputFile));

        String line;

        while ((line = reader.readLine()) != null) {
            parse(line);
        }
        reader.close();
    }

    public void writeFile(String outputFile) throws IOException{
        }
}
