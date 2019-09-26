package tools;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

class Block {
    private Formula formula;
    private String name;


    private Map<String,String> formValues;

    private String field;

    private List<Block> subblock;
    private List<Block> subblock2;

    private boolean inSTMT1;
    private boolean inSTMT2;
    private boolean inFormula;
    private String curr;

    void addFormValues(String key, String val) {
        this.formValues.put(key, val);
    }

    Block(String name) {
        this.subblock = new LinkedList<>();
        this.subblock2 = new LinkedList<>();

        this.formValues = new HashMap<>();

        this.inSTMT1 = false;
        this.inSTMT2 = false;
        this.inFormula = false;

        this.formula = new Formula();

        this.field = "";

        this.name = name;
    }

    String getName() {
        return name;
    }

    String getField() {
        return formValues.get(this.curr);
    }

    void setFormula(Formula formula){
        this.formula = formula;
    }

    void addSubblock(Block block){
        subblock.add(block);
    }

    List<Block> getSubblock() {
        return subblock;
    }

    List<Block> getSubblock2() {
        return subblock2;
    }

    void addSubblock2(Block block){
        if(this.name.equals("IfLogicBeginBrick")){
            this.name = "IfElseLogicBeginBrick";
        }
        subblock2.add(block);
    }

    boolean isInSTMT1() {
        return inSTMT1;
    }

    boolean isInSTMT2() {
        return inSTMT2;
    }

    boolean isInFormula() {
        return inFormula;
    }

    void workon2() {
        inSTMT2 = !inSTMT2;
    }

    void workon1() {
        inSTMT1 = !inSTMT1;
    }

    public void workonFormula() {
        inFormula = !inFormula;
    }

    void setCurr(String curr) {
        this.curr = curr;
    }

    String convertFormula() {
        StringBuilder formula = new StringBuilder();

        concatFormula(formula, this.formula);

        if(formula.toString().endsWith(" ")){
            formula.setLength(formula.length()-1);
        }

        return formula.toString();
    }

    private void concatFormula(StringBuilder formula_str, Formula formula) {

        if(isFunction(formula.getValue())){
            formula_str.append(whatOP(formula.getValue())).append("(");

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

            formula_str.append(whatOP(formula.getValue()));
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
            case "MULTI_FINGER_X":
            case "MULTI_FINGER_Y":
            case "MULTI_FINGER_TOUCHED":
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
            case "OBJECT_ROTATION":
                return "direction";
            case "OBJECT_LOOK_NUMBER":
                return "look number";
            case "OBJECT_LOOK_NAME":
                return "look name";
            case "FINGER_X":
                return "stage touch x";
            case "FINGER_Y":
                return "stage touch y";
            case "FINGER_TOUCHED":
                return "stage is touched";
            case "MULTI_FINGER_X":
                return "stage touch x";
            case "MULTI_FINGER_Y":
                return "stage touch y";
            case "LAST_FINGER_INDEX":
                return "last stage touch index";
            case "MULTI_FINGER_TOUCHED":
                return "stage is touched";
            case "NXT_SENSOR_1":
                return "NXT sensor 1";
            case "NXT_SENSOR_2":
                return "NXT sensor 2";
            case "NXT_SENSOR_3":
                return "NXT sensor 3";
            case "NXT_SENSOR_4":
                return "NXT sensor 4";
            case "EV3_SENSOR_1":
                return "EV3 sensor 1";
            case "EV3_SENSOR_2":
                return "EV3 sensor 2";
            case "EV3_SENSOR_3":
                return "EV3 sensor 3";
            case "EV3_SENSOR_4":
                return "EV3 sensor 4";
            case "GAMEPAD_A_PRESSED":
                return"gamepad a pressed";
            case "GAMEPAD_B_PRESSED":
                return"gamepad b pressed";
            case "GAMEPAD_UP_PRESSED":
                return"gamepad up pressed";
            case "GAMEPAD_DOWN_PRESSED":
                return"gamepad down pressed";
            case "GAMEPAD_LEFT_PRESSED":
                return"gamepad left pressed";
            case "GAMEPAD_RIGHT_PRESSED":
                return"gamepad right pressed";
            case "OBJECT_DISTANCE_TO":
            default:
                return operator;
        }
    }
}
