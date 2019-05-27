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
            formula_str.append(whatOP(formula.value) + "(");

            if (formula.getLeft() != null) {
                concatFormula(formula_str, formula.getLeft());
            }
            if (formula.getRight() != null) {
                formula_str.append(",");
                concatFormula(formula_str, formula.getRight());
            }
            if(formula_str.toString().endsWith(" ")){
                formula_str.setLength(formula_str.length()-1);
            }
            formula_str.append(") ");
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
            case "SIN":
            case "COS":
            case "TAN":
            case "LN":
            case "LOG":
            case "SQRT":
            case "RAND":
            case "ROUND":
            case "ABS":
            case "MOD":
            case "ARCSIN":
            case "ARCCOS":
            case "ARCTAN":
            case "EXP":
            case "POWER":
            case "FLOOR":
            case "CEIL":
            case "MAX":
            case "MIN":
            case "LENGTH":
            case "LETTER":
            case "JOIN":
            case "REGEX":
            case "LIST_ITEM":
            case "CONTAINS":
            case "NUMBER_OF_ITEMS":
            case "RASPIDIGITAL":
                return true;
            default:
                return false;
        }
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
                return "!=";
            case "GREATER_THAN":
                return "&gt;";
            case "GREATER_OR_EQUAL":
                return "&gt;=";
            case "SMALLER_THAN":
                return "&lt;";
            case "SMALLER_OR_EQUAL":
                return "&lt;=";
            case "LOGICAL_AND":
                return "and";
            case "LOGICAL_OR":
                return "or";
            case "LOG":
                return "decimal logarithm";
            case "RAND":
                return "random value from to";
            case "SQRT":
                return "square root";
            case "SIN":
                return "sinus";
            case "COS":
                return "cosinus";
            case "TAN":
                return "tangens";
            case "LN":
                return "natural logarithm";
            case "ROUND":
                return "round";
            case "ABS":
                return "absolute value";
            case "MOD":
                return "modulo";
            case "ARCSIN":
                return "arcsinus";
            case "ARCCOS":
                return "arccosinus";
            case "ARCTAN":
                return "arctangens";
            case "EXP":
                return "exponent";
            case "POWER":
                return "power";
            case "FLOOR":
                return "floor";
            case "CEIL":
                return "ceiling";
            case "MAX":
                return "maximum of";
            case "MIN":
                return "minimum of";
            case "LENGTH":
                return "length";
            case "LETTER":
                return "letter";
            case "JOIN":
                return "join";
            case "REGEX":
                return "regular expression";
            case "LIST_ITEM":
                return "item";
            case "CONTAINS":
                return "contains";
            case "NUMBER_OF_ITEMS":
                return "number of items";
            case "PI":
                return "pi";
            case "TRUE":
                return "true";
            case "FALSE":
                return "false";
            case "ARDUINOANALOG":
                return "arduino analog pin";
            case "ARDUINODIGITAL":
                return "arduino digital pin";
            case "RASPIDIGITAL":
                return "raspberry pi pin";
            case "LOGICAL_NOT":
                return "not";
            case "X_ACCELERATION":
                return "acceleration x";
            case "Y_ACCELERATION":
                return "acceleration y";
            case "Z_ACCELERATION":
                return "acceleration z";
            case "COMPASS_DIRECTION":
                return "compass direction";
            case "X_INCLINATION":
                return "inclination x";
            case "Y_INCLINATION":
                return "inclination y";
            case "LOUDNESS":
                return "loudness";
            case "LATITUDE":
                return "latitude";
            case "LONGITUDE":
                return "longitude";
            case "LOCATION_ACCURACY":
                return "location accuracy";
            case "ALTITUDE":
                return "altitude";
            case "DATE_YEAR":
                return "year";
            case "DATE_MONTH":
                return "month";
            case "DATE_DAY":
                return "day";
            case "DATE_WEEKDAY":
                return "weekday";
            case "TIME_HOUR":
                return "hour";
            case "TIME_MINUTE":
                return "minute";
            case "TIME_SECOND":
                return "second";
            case "FACE_DETECTED":
                return "face is visible";
            case "FACE_SIZE":
                return "face size";
            case "FACE_X_POSITION":
                return "face x position";
            case "FACE_Y_POSITION":
                return "face y position";
            case "OBJECT_X":
                return "position x";
            case "OBJECT_Y":
                return "position y";
            case "OBJECT_TRANSPARENCY":
                return "transparency";
            case "OBJECT_BRIGHTNESS":
                return "brightness";
            case "OBJECT_COLOR":
                return "color";
            case "OBJECT_SIZE":
                return "size";
            case "OBJECT_LAYER":
                return "layer";
            case "PHIRO_FRONT_LEFT":
                return "phiro front left sensor";
            case "PHIRO_FRONT_RIGHT":
                return "phiro front right sensor";
            case "PHIRO_SIDE_LEFT":
                return "phiro side left sensor";
            case "PHIRO_SIDE_RIGHT":
                return "phiro side right sensor";
            case "PHIRO_BOTTOM_LEFT":
                return "phiro bottom left sensor";
            case "PHIRO_BOTTOM_RIGHT":
                return "phiro bottom right sensor";
            case "DRONE_BATTERY_STATUS":
                return "drone battery status";
            case "DRONE_EMERGENCY_STATE":
                return "drone emergency state";
            case "DRONE_FLYING":
                return "drone flying";
            case "DRONE_INITIALIZED":
                return "drone initialized";
            case "DRONE_USB_ACTIVE":
                return "drone usb active";
            case "DRONE_USB_REMAINING_TIME":
                return "drone usb remaining time";
            case "DRONE_CAMERA_READY":
                return "drone camera ready";
            case "DRONE_RECORD_READY":
                return "drone record ready";
            case "DRONE_RECORDING":
                return "drone camera recording";
            case "DRONE_NUM_FRAMES":
                return "drone camera number of frames";
            case "COLLIDES_WITH_EDGE":
                return "touches edge";
            case "COLLIDES_WITH_FINGER":
                return "touches finger";
            case "OBJECT_X_VELOCITY":
                return "x velocity";
            case "OBJECT_Y_VELOCITY":
                return "y velocity";
            case "OBJECT_ANGULAR_VELOCITY":
                return "angular velocity";
            case "OBJECT_BACKGROUND_NUMBER":
                return "background number";
            case "OBJECT_BACKGROUND_NAME":
                return "background name";
            case "NFC_TAG_ID":
                return "nfc tag id";
            case "NFC_TAG_MESSAGE":
                return "nfc tag message";


            case "GAMEPAD_A_PRESSED":
            case "GAMEPAD_B_PRESSED":
            case "GAMEPAD_UP_PRESSED":
            case "GAMEPAD_DOWN_PRESSED":
            case "GAMEPAD_LEFT_PRESSED":
            case "GAMEPAD_RIGHT_PRESSED":
            case "MULTI_FINGER_X":
            case "MULTI_FINGER_Y":
            case "MULTI_FINGER_TOUCHED":
            case "LAST_FINGER_INDEX":
            case "FINGER_X":
            case "FINGER_Y":
            case "FINGER_TOUCHED":
            case "OBJECT_ROTATION":
            case "OBJECT_DISTANCE_TO":
            case "NXT_SENSOR_1":
            case "NXT_SENSOR_2":
            case "NXT_SENSOR_3":
            case "NXT_SENSOR_4":
            case "EV3_SENSOR_1":
            case "EV3_SENSOR_2":
            case "EV3_SENSOR_3":
            case "EV3_SENSOR_4":
            case "OBJECT_LOOK_NUMBER":
            case "OBJECT_LOOK_NAME":
            default:
                return operator;
        }
    }
}
