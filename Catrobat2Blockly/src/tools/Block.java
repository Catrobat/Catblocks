package tools;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Block {
    private Formula formula;
    private String name;


    private Map<String,String> formValues;

    private String field;

    private List<Block> subblock;
    private List<Block> subblock2;

    private boolean inSTMT1;
    private boolean inSTMT2;
    private String curr;

    public String getFormValue(String key) {
        return formValues.get(key);
    }

    public void addFormValues(String key, String val) {
        this.formValues.put(key, val);
    }

    public Block(String name) {
        this.subblock = new LinkedList<>();
        this.subblock2 = new LinkedList<>();

        this.formValues = new HashMap<>();

        this.inSTMT1 = false;
        this.inSTMT2 = false;

        this.formula = new Formula();

        this.field = "";

        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getField() {
        return formValues.get(this.curr);
    }

    public void setFormula(Formula formula){
        this.formula = formula;
    }

    public Formula getFormula() {
        return formula;
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

        updateFormula();

        if(this.name.contains("RepeatUntilBrick")){
            this.formValues.put("REPEAT_UNTIL_CONDITION",this.field);
        }
        else{
            this.formValues.put("TEXT",this.field);
        }
    }

    private void updateFormula() {

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

    public void setCurr(String curr) {
        this.curr = curr;
    }

    public String convertFormula() {
        StringBuilder formula = new StringBuilder();

        concatFormula(formula, this.formula);

        if(formula.toString().endsWith(" ")){
            formula.setLength(formula.length()-1);
        }

        return formula.toString();
    }

    private void concatFormula(StringBuilder formula_str, Formula formula) {

        if(isFunction(formula.getValue())){
            formula_str.append(formula.value + "(");

            if (formula.getLeft() != null) {
                concatFormula(formula_str, formula.getLeft());
            }
            if (formula.getRight() != null) {
                formula_str.append(",");
                concatFormula(formula_str, formula.getRight());
            }
            formula_str.setLength(formula_str.length()-1);
            formula_str.append(")");
        }else {
            if (formula.getLeft() != null) {
                concatFormula(formula_str, formula.getLeft());
            }

            formula_str.append(whatOP(formula.value));
            formula_str.append(" ");

            if (formula.getRight() != null) {
                concatFormula(formula_str, formula.getRight());
            }
        }
    }

    private boolean isFunction(String value) {
        switch(value){
            case "LOG":
                return true;
            default:
                return false;
        }
    }
}
