package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;

public class Parser {

    private static final String BRICK_DEF = "<brick ";
    private static final String BRICKLIST_DEF = "<brickList>";
    private static final String FORMULARLIST_BEGIN = "<formulaList>";
    private static final String BRICKLIST_END = "</brickList>";
    private static final String FORMULARLIST_END = "</formulaList>";

    private static final String FOREVER_DEF = "ForeverBrick";
    private static final String IF_DEF = "IfThenLogicBeginBrick";
    private static final String IF_ELSE_DEF = "IfLogicBeginBrick";
    private static final String REPEAT_DEF = "RepeatBrick";
    private static final String REPEAT_UNTIL_DEF = "RepeatUntilBrick";
    private static final String ELSEBRANCH_DEF = "elseBranchBricks";
    private static final String IFBRANCH_DEF = "ifBranchBricks";
    private static final String LOOP_DEF = "loopBricks";

    private static final String LEFTCHILD = "leftChild";
    private static final String RIGHTCHILD = "rightChild";
    private static final String OPERATOR = "OPERATOR";
    private static final String STRING = "STRING";
    private static final String NUMBER = "NUMBER";

    private static final String SCRIPT_DEF = "<script ";
    private static final String BRICK_TYPE = "type=";
    private static final String XML_BEGIN = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">";
    private static final String XML_END = "</xml>";
    private static final String NEXT_BEGIN = "<next>";
    private static final String NEXT_END = "</next>";
    private static final String SUB1_BEGIN = "<statement name=\"SUBSTACK\">";
    private static final String SUB2_BEGIN = "<statement name=\"SUBSTACK2\">";
    private static final String SUB_END = "</statement>";


    private final String filePath;

    private boolean inBrickList = false;
    private boolean inFormularList = false;
    private boolean inLeftChild = false;
    private boolean inRightChild= false;
    private boolean inOperator = false;

    private List<Script> scripts;
    private Script currScript;
    private Block cur_block;
    private boolean skip = false;
    private Block edit_block;

    public Parser() {
        scripts = new LinkedList<>();
        cur_block = null;
        filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];
    }

    public void parse(String line) {

        if(skip){
            return;
        }else {
            checkWhereWeAre(line);
        }

        if(inBrickList && line.contains(BRICK_DEF) && line.contains(BRICK_TYPE)){
            addNewBlock(line);
        }
        if(inFormularList){
            if(inLeftChild){
                //Parse left child <value>1</value>
                if(line.contains("<value>")) {
                    String name = line.split("</?value>")[1];
                    System.out.println(name);
                    edit_block.setLeftChild(name);
                }
            }
            if(inOperator){
                //Parse operator child
                if(line.contains("<value>")) {
                    String name = line.split("</?value>")[1];
                    System.out.println(name);
                    inOperator = false;
                    edit_block.setOperator(name);
                }
            }
            if(inRightChild){
                //Parse left child
                if(line.contains("<value>")) {
                    String name = line.split("</?value>")[1];
                    edit_block.setRightChild(name);
                }
            }
        }

        if(line.contains(SCRIPT_DEF) && line.contains(BRICK_TYPE)){
            String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

            Script script = new Script(name);

            currScript = script;

            scripts.add(script);
        }
    }

    private void addNewBlock(String line) {
        String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

        Block block = new Block(name);
        edit_block = block;

        if(isLoop(name)){
            cur_block = block;
        }

        if(cur_block != null){
            if(cur_block.isInSTMT1()){
                cur_block.addSubblock(block);
            }else if(cur_block.isInSTMT2()){
                cur_block.addSubblock2(block);
            }else{
                currScript.addBlock(block);
            }
        }else{
            currScript.addBlock(block);
        }
    }

    private boolean isLoop(String name) {
        return name.equals(IF_ELSE_DEF) || name.equals(REPEAT_DEF) ||
                name.equals(IF_DEF) || name.equals(FOREVER_DEF) ||
                name.equals(REPEAT_UNTIL_DEF);
    }

    private void checkWhereWeAre(String line) {
        if(line.contains(BRICKLIST_DEF)){
            inBrickList = true;
        }
        if(line.contains(BRICKLIST_END)){
            inBrickList = false;
            skip = false;
        }

        if(edit_block != null){
            if(line.contains(FORMULARLIST_BEGIN)){
                inFormularList = true;
            }
            if(line.contains(FORMULARLIST_END)){
                inFormularList = false;
            }

            if(inFormularList && line.contains(LEFTCHILD)){
                inLeftChild = !inLeftChild;
            }
            if(inFormularList && line.contains(RIGHTCHILD)){
                inRightChild = !inRightChild;
            }
            if(inFormularList && (line.contains(OPERATOR) || line.contains(STRING) || line.contains(NUMBER))){
                inOperator = true;
            }
        }

        if(cur_block != null && line.contains(ELSEBRANCH_DEF)){
            cur_block.workon2();
        }

        if(cur_block != null && (line.contains(IFBRANCH_DEF) || line.contains(LOOP_DEF))){
            cur_block.workon1();
            if(!cur_block.getworkon1() && cur_block.getName().equals(FOREVER_DEF)){
                skip = true;
            }
        }
    }

    public void write(String outFile) throws IOException {
        PrintWriter writer = new PrintWriter(outFile);
        writer.println(XML_BEGIN);

        for(Script script : scripts){
            String path = getPath(script.getName());
            writeToFile(writer, path, script);
        }

        writer.println(XML_END);
        writer.close();
    }

    private String getPath(String name) {
        return filePath + "scratch-blocks-develop/tests/catblocks/" + name + ".xml";
    }

    private void writeToFile(PrintWriter writer, String path, Script script) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader(path));

        String line = "";

        while((line = reader.readLine())!= null){
            if(!(line.contains("xml") || line.contains("<variables>"))){
                if(line.contains("</block>")){
                    writeNextBlock(writer, script.getBlocks(), 0, true);
                }
                writer.println(line);
            }
        }

        reader.close();
    }

    private void writeNextBlock(PrintWriter writer, List<Block> blocks, Integer index, Boolean next) throws IOException {
        if(blocks.isEmpty() || blocks.size() == index){
            return;
        }
        if(next) {
            writer.println(NEXT_BEGIN);
        }
        Block block = blocks.get(index);

        String path = getPath(block.getName());

        BufferedReader reader = new BufferedReader(new FileReader(path));

        String line = "";

        while((line = reader.readLine())!= null){
            if(!(line.contains("xml") || line.contains("<variables>"))){

                if(line.contains("</block>")){
                    if(!block.getSubblock().isEmpty()){
                        writer.println(SUB1_BEGIN);
                        writeNextBlock(writer, block.getSubblock(), 0, false);
                        writer.println(SUB_END);
                    }
                    if(!block.getSubblock2().isEmpty()){
                        writer.println(SUB2_BEGIN);
                        writeNextBlock(writer, block.getSubblock2(), 0, false);
                        writer.println(SUB_END);
                    }
                    writeNextBlock(writer, blocks, index+1, true);
                }

                if(line.contains("<field name=\"TEXT\">")){
                    writer.println("<field name=\"TEXT\">" + block.getField() + "</field>");
                }else{
                    writer.println(line);
                }
            }
        }

        reader.close();
        if(next){
            writer.println(NEXT_END);
        }
    }

    public void update() {
        for(Script script : scripts){
            updateBlocklist(script.getBlocks());
        }
    }

    private void updateBlocklist(List<Block> blocks) {
        if(blocks.isEmpty()){
            return;
        }
        for(Block block : blocks){
            block.updateBlockField();
            updateBlocklist(block.getSubblock());
            updateBlocklist(block.getSubblock2());
        }
    }
}
