package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class Parser {

    private static final String BRICK_DEF = "<brick ";
    private static final String BRICKLIST_DEF = "<brickList>";
    private static final String FORMULALIST_BEGIN = "<formulaList>";
    private static final String FORMULA_BEGIN = "<formula ";
    private static final String FORMULA_END = "</formula>";
    private static final String BRICKLIST_END = "</brickList>";
    private static final String FORMULALIST_END = "</formulaList>";

    private static final String FOREVER_DEF = "ForeverBrick";
    private static final String IF_DEF = "IfThenLogicBeginBrick";
    private static final String IF_ELSE_DEF = "IfLogicBeginBrick";
    private static final String REPEAT_DEF = "RepeatBrick";
    private static final String REPEAT_UNTIL_DEF = "RepeatUntilBrick";
    private static final String ELSEBRANCH_DEF = "elseBranchBricks";
    private static final String IFBRANCH_DEF = "ifBranchBricks";
    private static final String LOOP_DEF = "loopBricks";

    private static final String LEFTCHILD = "<leftChild";
    private static final String RIGHTCHILD = "<rightChild";
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
    private boolean inRightChild = false;
    private boolean inOperator = false;

    private List<Script> scripts;
    private Script currScript;
    private Block condBlock;
    private boolean skip = false;
    private Block currBlock;
    private boolean inAppendVal = false;
    private String currVal;
    private Stack<Formula> formulaStack;
    private Formula currFormula;


    public Parser() {
        scripts = new LinkedList<>();
        condBlock = null;
        filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];
        formulaStack = new Stack<>();
    }

    public void parse(String line) {

        if (skip) {
            return;
        } else {
            checkWhereWeAre(line);
        }

        if (inBrickList && line.contains(BRICK_DEF) && line.contains(BRICK_TYPE)) {
            addNewBlock(line);
        }
        if (inFormularList) {
            if (line.contains("<formula category=")) {
                currVal = (line.split("category=\"")[1].split("\">")[0]);
            }
            if (line.contains("<value>")) {
                String name = line.split("</?value>")[1];
                Formula formula = formulaStack.pop();
                formula.setValue(name);
            }
            if(line.contains(FORMULA_END)){
                String formula = currBlock.convertFormula();
                currBlock.addFormValues(currVal, formula);
            }
        }

        if (line.contains(SCRIPT_DEF) && line.contains(BRICK_TYPE)) {
            String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

            Script script = new Script(name);

            currScript = script;

            scripts.add(script);
        }
    }

    private void addNewBlock(String line) {
        String name = (line.split(BRICK_TYPE)[1]).split("\"")[1];

        String path = getPath(name);
        File file = new File(path);

        if (file.exists()) {
            Block block = new Block(name);
            currBlock = block;

            if (isCondition(name)) {
                condBlock = block;
            }

            if (condBlock != null) {
                if (condBlock.isInSTMT1()) {
                    condBlock.addSubblock(block);
                } else if (condBlock.isInSTMT2()) {
                    condBlock.addSubblock2(block);
                } else {
                    currScript.addBlock(block);
                }
            } else {
                currScript.addBlock(block);
            }
        }
    }

    private boolean isCondition(String name) {
        return name.equals(IF_ELSE_DEF) || name.equals(REPEAT_DEF) ||
                name.equals(IF_DEF) || name.equals(FOREVER_DEF) ||
                name.equals(REPEAT_UNTIL_DEF);
    }

    private void checkWhereWeAre(String line) {
        if (line.contains(BRICKLIST_DEF)) {
            inBrickList = true;
        }
        if (line.contains(BRICKLIST_END)) {
            inBrickList = false;
        }

        if (currBlock != null) {
            if (line.contains(FORMULALIST_BEGIN)) {
                inFormularList = true;
            }
            if (line.contains(FORMULALIST_END)) {
                inFormularList = false;
            }
            if (line.contains(FORMULA_BEGIN)) {
                Formula formula = new Formula();
                currBlock.setFormula(formula);
                formulaStack.push(formula);
            }

            if (inFormularList && line.contains(LEFTCHILD)) {
                Formula curr = formulaStack.pop();
                Formula formula = new Formula();
                curr.setLeft(formula);
                formulaStack.push(curr);
                formulaStack.push(formula);
            }
            if (inFormularList && line.contains(RIGHTCHILD)) {
                Formula curr = formulaStack.pop();
                Formula formula = new Formula();
                curr.setRight(formula);
                formulaStack.push(curr);
                formulaStack.push(formula);
            }
        }

        if (condBlock != null && line.contains(ELSEBRANCH_DEF)) {
            condBlock.workon2();
        }

        if (condBlock != null && (line.contains(IFBRANCH_DEF) || line.contains(LOOP_DEF))) {
            condBlock.workon1();
            if (!condBlock.getworkon1() && condBlock.getName().equals(FOREVER_DEF)) {
                skip = true;
            }
        }
    }

    public void write(String outFile) throws IOException {
        PrintWriter writer = new PrintWriter(outFile);
        writer.println(XML_BEGIN);

        for (Script script : scripts) {
            String path = getPath(script.getName());
            writeToFile(writer, path, script);
        }

        writer.println(XML_END);
        writer.close();
    }

    private String getPath(String name) {
        return filePath + "BlockLibrary/" + name + ".xml";
    }

    private void writeToFile(PrintWriter writer, String path, Script script) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader(path));

        String line = "";

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

    public void update() {
        for (Script script : scripts) {
            updateBlocklist(script.getBlocks());
        }
    }

    private void updateBlocklist(List<Block> blocks) {
        if (blocks.isEmpty()) {
            return;
        }
        for (Block block : blocks) {
            block.updateBlockField();
            updateBlocklist(block.getSubblock());
            updateBlocklist(block.getSubblock2());
        }
    }

    public void parseFile(String inputFile) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(inputFile));

        String line = "";

        while ((line = reader.readLine()) != null) {
            parse(line);
        }

        reader.close();
    }
}
