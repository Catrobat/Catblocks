package tools;

import java.util.LinkedList;
import java.util.List;

public class Block {
    private String name;

    private String leftChild;
    private String rightChild;
    private String operator;

    private String field;

    private List<Block> subblock;
    private List<Block> subblock2;

    private boolean inSTMT1;
    private boolean inSTMT2;

    public Block(String name) {
        this.subblock = new LinkedList<>();
        this.subblock2 = new LinkedList<>();

        this.inSTMT1 = false;
        this.inSTMT2 = false;

        this.leftChild = "";
        this.operator = "";
        this.rightChild = "";

        this.field = "";

        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getField() {
        return field;
    }

    public void setLeftChild(String leftChild) {
        this.leftChild = leftChild;
    }

    public void setRightChild(String rightChild) {
        this.rightChild = rightChild;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public void addSubblock(Block block){
        subblock.add(block);
    }

    public List<Block> getSubblock() {
        return subblock;
    }

    public void setSubblock(List<Block> subblock) {
        this.subblock = subblock;
    }

    public List<Block> getSubblock2() {
        return subblock2;
    }

    public void setSubblock2(List<Block> subblock2) {
        this.subblock2 = subblock2;
    }

    public void addSubblock2(Block block){
        if(this.name.equals("IfLogicBeginBrick")){
            this.name = "IfElseLogicBeginBrick";
        }
        subblock2.add(block);
    }

    public boolean isInSTMT1() {
        return inSTMT1;
    }

    public boolean isInSTMT2() {
        return inSTMT2;
    }

    public void workon2() {
        inSTMT2 = !inSTMT2;
    }

    public void workon1() {
        inSTMT1 = !inSTMT1;
    }

    public boolean getworkon1(){
        return inSTMT1;
    }

    public void updateBlockField(){
        this.field = this.leftChild + whatOP(this.operator) + this.rightChild;
    }

    private String whatOP(String operator) {
        switch(operator){
            case "PLUS":
                return "+";
            case "MINUS":
                return "-";
            case "MULT":
                return "*";
            case "DIVIDE":
                return "/";
            case "POW":
                return "^";
            case "EQUAL":
                return "=";
            case "NOT_EQUAL":
                return "&ne;";
            case "GREATER_THAN":
                return "&gt;";
            case "GREATER_OR_EQUAL":
                return "&ge;";
            case "SMALLER_THAN":
                return "&lt;";
            case "SMALLER_OR_EQUAL":
                return "&le;";
            case "LOGICAL_AND":
                return "and";
            case "LOGICAL_OR":
                return "or";
            default:
                return operator;
        }
    }
}
