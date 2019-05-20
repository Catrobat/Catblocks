package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;

public class Parser {

    private static final String BRICK_DEF = "<brick ";
    private static final String BRICKLIST_DEF = "<brickList>";
    private static final String BRICKLIST_END = "</brickList>";

    private static final String FOREVER_DEF = "ForeverBrick";
    private static final String IF_DEF = "IfThenLogicBeginBrick";
    private static final String IF_ELSE_DEF = "IfLogicBeginBrick";
    private static final String REPEAT_DEF = "RepeatBrick";
    private static final String REPEAT_UNTIL_DEF = "RepeatUntilBrick";

    private static final String ELSEBRANCH_DEF = "elseBranchBricks";
    private static final String IFBRANCH_DEF = "ifBranchBricks";
    private static final String LOOP_DEF = "loopBricks";
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

    private List<Script> scripts;
    private Script currScript;
    private Block cur_block;
    private boolean skip = false;

    public Parser() {
        scripts = new LinkedList<>();
        cur_block = null;
        filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];
    }

    public void parse(String line) {
        if(line.contains(BRICKLIST_DEF)){
            inBrickList = true;
        }
        if(line.contains(BRICKLIST_END)){
            inBrickList = false;
            skip = false;
        }
        if(skip){
            return;
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

        if(inBrickList && line.contains(BRICK_DEF) && line.contains(BRICK_TYPE)){
            String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

            Block block = new Block(name);

            if(name.equals(IF_ELSE_DEF) || name.equals(REPEAT_DEF) ||
                    name.equals(IF_DEF) || name.equals(FOREVER_DEF) ||
                    name.equals(REPEAT_UNTIL_DEF)){
                cur_block = block;
            }

            if(cur_block != null){
                if(cur_block.isInSTMT1()){
                    System.out.println("Add Block to IF");
                    cur_block.addSubblock(block);
                }else if(cur_block.isInSTMT2()){
                    System.out.println("Add Block to ELSE");
                    cur_block.addSubblock2(block);
                }else{
                    System.out.println("Added Block");
                    currScript.addBlock(block);
                }
            }else{
                System.out.println("Added Block");
                currScript.addBlock(block);
            }

        }
        if(line.contains(SCRIPT_DEF) && line.contains(BRICK_TYPE)){
            String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

            Script script = new Script(name);

            currScript = script;

            scripts.add(script);
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
                        System.out.println("Write SubBlock");
                        writeNextBlock(writer, block.getSubblock(), 0, false);
                        writer.println(SUB_END);
                    }
                    if(!block.getSubblock2().isEmpty()){
                        writer.println(SUB2_BEGIN);
                        System.out.println("Write SubBlock2");
                        writeNextBlock(writer, block.getSubblock2(), 0, false);
                        writer.println(SUB_END);
                    }

                    System.out.println("Write Block");
                    writeNextBlock(writer, blocks, index+1, true);
                }
                writer.println(line);
            }
        }

        reader.close();
        if(next){
            writer.println(NEXT_END);
        }
    }
}
