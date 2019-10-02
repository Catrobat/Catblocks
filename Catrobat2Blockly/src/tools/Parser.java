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
    private static final String FORMULA_DEFINITION = "<formula category=";

    private final String filePath;
    private List<Scene> sceneList;
    private Scene currentScene;
    private Object currentObject;
    private Script currentScript;
    private Stack<Block> conditionStack;
    private Stack<Block> blockStack;
    private Stack<Formula> formulaStack;
    private Block currentCondBlock;
    private Block currentBlock;
    private String currVal;
    private Boolean parse;


    public Parser() {
        filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];
        sceneList = new LinkedList<>();
        conditionStack = new Stack<>();
        blockStack = new Stack<>();
        formulaStack = new Stack<>();
        parse = true;
    }

    private void parse(String line){
        if(line.contains("<")) {
            line = "<" + line.split("<", 2)[1];
        }

        if(line.contains("<applicationVersion>"))
        {
            String[] version = (line.split("</?applicationVersion>")[1].replaceAll("[a-z]*", "")).split("\\.");
            parse = checkVersion(version);
            if(parse){
                System.out.println("Correct Version!");
            }
            else{
                System.out.println("Wrong Version!");
            }
        }

        if(currentScene != null) {

            if(currentObject != null) {

                if(currentScript != null) {
                    if(line.contains("loopBricks>") || line.contains("ifBranchBricks>")){
                        currentCondBlock.workon1();
                    }
                    if(line.contains("elseBranchBricks>")){
                        currentCondBlock.workon2();
                    }
                    if(line.contains("formulaList>")){
                        currentBlock.workonFormula();
                    }
                    if(line.contains("userList>")){
                        currentBlock.workonUserList();
                    }
                    if(currentBlock != null && currentBlock.isInUserList() && line.contains("<name>")){
                        String name = line.split("</?name>")[1];
                        currentBlock.addFormValues("DROPDOWN", name);
                    }
                    if (line.contains("reference=\"")){
                        String ref = getReference(line);
                        String value = "";
                        int pos = getPosition(ref);
                        if(line.startsWith("<look")){
                            if(ref.startsWith("object/")){
                                value = (currentScene.getObjects().get(0).getLookList().get(pos-1).getName());
                            }
                            else{
                                value = (currentObject.getLookList().get(pos-1).getName());
                            }
                        }
                        if(line.startsWith("<sound")){
                            value = (currentObject.getSoundList().get(pos-1));
                        }
                        addFormValue(value);
                    }
                    if(line.contains("<broadcastMessage>")){
                        String message = line.split("</?broadcastMessage>")[1];
                        addFormValue(message);
                    }
                    if(line.contains("<receivedMessage>")){
                        String message = line.split("</?receivedMessage>")[1];
                        addFormValue(message);
                    }
                    if(line.contains("<sceneToStart>")){
                        String message = line.split("</?sceneToStart>")[1];
                        addFormValue(message);
                    }
                    if(line.contains("<sceneForTransition>")){
                        String message = line.split("</?sceneForTransition>")[1];
                        addFormValue(message);
                    }
                    if(currentBlock != null && currentBlock.isInFormula()){
                        if (line.contains(FORMULA_DEFINITION)) {
                            Formula formula = new Formula();
                            currentBlock.setFormula(formula);
                            formulaStack.push(formula);
                            currVal = (line.split("category=\"")[1].split("\">")[0]);
                        }
                        if (line.contains("<value>")) {
                            String name = line.split("</?value>")[1];
                            Formula formula = formulaStack.pop();
                            formula.setValue(name);
                        }
                        if (line.contains("<leftChild")) {
                            Formula curr = formulaStack.pop();
                            Formula formula = new Formula();
                            curr.setLeft(formula);
                            formulaStack.push(curr);
                            formulaStack.push(formula);
                        }
                        if (line.contains("<rightChild")) {
                            Formula curr = formulaStack.pop();
                            Formula formula = new Formula();
                            curr.setRight(formula);
                            formulaStack.push(curr);
                            formulaStack.push(formula);
                        }
                        if(line.contains("</formula>")){
                            String formula = currentBlock.convertFormula();
                            currentBlock.addFormValues(currVal, formula);
                        }
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
                else{
                    if(line.contains("<look fileName=\"")){
                        String name = line.split("name=\"")[1].replace("\"/>", "");
                        String file = line.split("\" name=\"")[0].replace("<look fileName=\"", "");
                        currentObject.addLook(name,file);
                    }
                    if(line.contains("<sound fileName=\"")){
                        String name = line.split("name=\"")[1].replace("\"/>", "");
                        currentObject.addSound(name);
                    }
                }
                if (line.contains("<script ")) {
                    String name = line.split("type=\"")[1].replace("\">", "");
                    currentScript = new Script(name);
                    currentObject.addScript(currentScript);
                }
            }

            if (line.contains("<object ")) {
                String name = line.split("name=\"")[1].replace("\">", "");
                currentObject = new Object(name);
                currentScene.addObject(currentObject);
            }
        }

        if(line.equals("<scene>")) {
            currentScene = new Scene("");
            sceneList.add(currentScene);
        }

        if(line.equals("</brick>")) {
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
        if(currentScene != null && line.contains("<name>") && currentScene.getName().equals("")){
            currentScene.setName(line.replaceAll("</?name>", ""));
        }
    }

    private Boolean checkVersion(String[] version) {
        return Integer.parseInt(version[0]) > 0 || Integer.parseInt(version[1]) > 9 || (Integer.parseInt(version[1]) == 9 && Integer.parseInt(version[2]) >= 64);
    }

    private int getPosition(String ref) {
        if(ref.contains("[")){
            return Integer.parseInt(ref.split("\\[")[1].replaceAll("]",""));
        }
        return 1;
    }

    private String getReference(String line) {
        return (line.split("reference=\"")[1]).replace("\"/>","").replace("../", "");
    }

    private void addFormValue(String value) {
        if(currentBlock != null) {
            currentBlock.addFormValues("DROPDOWN", value);
        }
        else{
            currentScript.addFormValues(value);
        }
    }

    private boolean isConditionBrick(String name) {
        return name.equals("ForeverBrick") || name.equals("RepeatBrick") || name.equals("RepeatUntilBrick") ||
               name.equals("IfThenLogicBeginBrick") || name.equals("IfLogicBeginBrick") || name.equals("IfElseLogicBeginBrick");
    }


    public void parseFile(String inputFile) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(inputFile));

        String line;

        while ((line = reader.readLine()) != null && parse) {
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
                writer.println("<object type=\"" + object.getName() + "\" look=\"" + object.getLookList().get(0).getFile() + "\">");
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
                if (line.contains("<value name=")) {
                    String text = line.split("value name=\"")[1].replaceAll("\">", "");//"<value name=\"NOTE\">"
                    script.setCurr(text);
                }
                if (line.contains("<field name=\"TEXT\">")) {
                    writer.println("<field name=\"TEXT\">" + script.getField() + "</field>");
                } else if (line.contains("<field name=\"DROPDOWN\">")) {
                    script.setCurr("DROPDOWN");
                    if(script.getField() != null) {
                        writer.println("<field name=\"DROPDOWN\">" + script.getField() + "</field>");
                    }
                    else{
                        writer.println(line);
                    }
                } else{
                    writer.println(line);
                }
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
                if (line.contains("<field name=\"TEXT\">") && block.getField() != null) {
                    writer.println("<field name=\"TEXT\">" + block.getField() + "</field>");
                } else if (line.contains("<field name=\"DROPDOWN\">")){
                    block.setCurr("DROPDOWN");
                    if(block.getField() != null) {
                        writer.println("<field name=\"DROPDOWN\">" + block.getField() + "</field>");
                    }
                    else{
                        writer.println(line);
                    }
                }
                else{
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
