package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class Parser {

    private static final String XML_BEGIN = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">";
    private static final String XML_END = "</xml>";
    private static final String NEXT_BEGIN = "<next>";
    private static final String NEXT_END = "</next>";
    private static final String SUB1_BEGIN = "<statement name=\"SUBSTACK\">";
    private static final String SUB2_BEGIN = "<statement name=\"SUBSTACK2\">";
    private static final String SUB_END = "</statement>";

    private final String filePath;
    private List<Scene> sceneList;
    private Scene currentScene;
    private Object currentObject;
    private Script currentScript;
    private Stack<Block> conditionStack;
    private Stack<Block> blockStack;
    private Block currentCondBlock;
    private Block currentBlock;


    public Parser() {
        filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];
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
                        currentBlock = block;
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
            currentBlock = null;
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
    public void write(String outFile) throws IOException {
        PrintWriter writer = new PrintWriter(outFile);
        writer.println(XML_BEGIN);

        for(Scene scene : sceneList){
            writer.println("<scene type=\"" + scene.getName() + "\">");
            for(Object object : scene.getObjects()) {
                writer.println("<object type=\"" + object.getName() + "\">");
                for (Script script : object.getScriptList()) {
                    writer.println("<script type=\"" + script.getName() + "\">");
                    String path = getPath(script.getName());
                    writeToFile(writer, path, script);
                    writer.println("</script>");
                }
                writer.println("</object>");
            }
            writer.println("</scene>");
        }

        writer.println(XML_END);
        writer.close();
    }

    private String getPath(String name) {
        return filePath + "BlockLibrary/" + name + ".xml";
    }

    private void writeToFile(PrintWriter writer, String path, Script script) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader(path));

        String line;

        while ((line = reader.readLine()) != null) {
            if (!(line.contains("xml") || line.contains("<variables>"))) {
                if (line.contains("</block>")) {
                    writeNextBlock(writer, script.getBlocks(), 0, true);
                }
                writer.println(line);
            }
        }

        reader.close();
    }

    private void writeNextBlock(PrintWriter writer, List<Block> blocks, Integer index, Boolean next) throws IOException {
        if (blocks.isEmpty() || blocks.size() == index) {
            return;
        }
        if (next) {
            writer.println(NEXT_BEGIN);
        }
        Block block = blocks.get(index);

        String path = getPath(block.getName());

        BufferedReader reader = new BufferedReader(new FileReader(path));

        String line;

        while ((line = reader.readLine()) != null) {
            if (!(line.contains("xml") || line.contains("<variables>"))) {

                if (line.contains("</block>")) {
                    if (!block.getSubblock().isEmpty()) {
                        writer.println(SUB1_BEGIN);
                        writeNextBlock(writer, block.getSubblock(), 0, false);
                        writer.println(SUB_END);
                    }
                    if (!block.getSubblock2().isEmpty()) {
                        writer.println(SUB2_BEGIN);
                        writeNextBlock(writer, block.getSubblock2(), 0, false);
                        writer.println(SUB_END);
                    }
                    writeNextBlock(writer, blocks, index + 1, true);
                }

                if (line.contains("<value name=")) {
                    String text = line.split("value name=\"")[1].replaceAll("\">", "");//"<value name=\"NOTE\">"
                    block.setCurr(text);
                }

                if (line.contains("<field name=\"TEXT\">")) {
                    writer.println("<field name=\"TEXT\">" + block.getField() + "</field>");
                } else {
                    writer.println(line);
                }
            }
        }

        reader.close();
        if (next) {
            writer.println(NEXT_END);
        }
    }
}
