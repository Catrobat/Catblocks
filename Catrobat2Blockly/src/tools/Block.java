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
                return "${formula_editor_operator_plus}";
            case "MINUS":
                return "${formula_editor_operator_minus}";
            case "MULT":
                return "${formula_editor_operator_mult}";
            case "DIVIDE":
                return "${formula_editor_operator_divide}";
            case "POW":
                return "${formula_editor_operator_power}";
            case "EQUAL":
                return "${formula_editor_logic_equal}";
            case "NOT_EQUAL":
                return "${formula_editor_logic_notequal}";
            case "GREATER_THAN":
                return "${formula_editor_logic_greaterthan}";
            case "GREATER_OR_EQUAL":
                return "${formula_editor_logic_greaterequal}";
            case "SMALLER_THAN":
                return "${formula_editor_logic_lesserthan}";
            case "SMALLER_OR_EQUAL":
                return "${formula_editor_logic_leserequal}";
            case "LOGICAL_AND":
                return "${formula_editor_logic_and}";
            case "LOGICAL_OR":
                return "${formula_editor_logic_or}";
            case "LOG":
                return "${formula_editor_function_log}";
            case "RAND":
                return "${formula_editor_function_rand}";
            case "SQRT":
                return "${formula_editor_function_sqrt}";
            case "SIN":
                return "${formula_editor_function_sin}";
            case "COS":
                return "${formula_editor_function_cos}";
            case "TAN":
                return "${formula_editor_function_tan}";
            case "LN":
                return "${formula_editor_function_ln}";
            case "ROUND":
                return "${formula_editor_function_round}";
            case "ABS":
                return "${formula_editor_function_abs}";
            case "MOD":
                return "${formula_editor_function_mod}";
            case "ARCSIN":
                return "${formula_editor_function_arcsin}";
            case "ARCCOS":
                return "${formula_editor_function_arccos}";
            case "ARCTAN":
                return "${formula_editor_function_arctan}";
            case "EXP":
                return "${formula_editor_function_exp}";
            case "POWER":
                return "${formula_editor_function_power}";
            case "FLOOR":
                return "${formula_editor_function_floor}";
            case "CEIL":
                return "${formula_editor_function_ceil}";
            case "MAX":
                return "${formula_editor_function_max}";
            case "MIN":
                return "${formula_editor_function_min}";
            case "LENGTH":
                return "${formula_editor_function_length}";
            case "LETTER":
                return "${formula_editor_function_letter}";
            case "JOIN":
                return "${formula_editor_function_join}";
            case "REGEX":
                return "${formula_editor_function_regex}";
            case "LIST_ITEM":
                return "${formula_editor_function_list_item}";
            case "CONTAINS":
                return "${formula_editor_function_contains}";
            case "NUMBER_OF_ITEMS":
                return "${formula_editor_function_number_of_items}";
            case "PI":
                return "${formula_editor_function_pi}";
            case "TRUE":
                return "${formula_editor_function_true}";
            case "FALSE":
                return "${formula_editor_function_false}";
            case "ARDUINOANALOG":
                return "${formula_editor_function_arduino_read_pin_value_analog}";
            case "ARDUINODIGITAL":
                return "${formula_editor_function_arduino_read_pin_value_digital}";
            case "RASPIDIGITAL":
                return "${formula_editor_function_raspi_read_pin_value_digital}";
            case "LOGICAL_NOT":
                return "${formula_editor_logic_not}";
            case "X_ACCELERATION":
                return "${formula_editor_sensor_x_acceleration}";
            case "Y_ACCELERATION":
                return "${formula_editor_sensor_y_acceleration}";
            case "Z_ACCELERATION":
                return "${formula_editor_sensor_z_acceleration}";
            case "COMPASS_DIRECTION":
                return "${formula_editor_sensor_compass_direction}";
            case "X_INCLINATION":
                return "${formula_editor_sensor_x_inclination}";
            case "Y_INCLINATION":
                return "${formula_editor_sensor_y_inclination}";
            case "LOUDNESS":
                return "${formula_editor_sensor_loudness}";
            case "LATITUDE":
                return "${formula_editor_sensor_latitude}";
            case "LONGITUDE":
                return "${formula_editor_sensor_longitude}";
            case "LOCATION_ACCURACY":
                return "${formula_editor_sensor_location_accuracy}";
            case "ALTITUDE":
                return "${formula_editor_sensor_altitude}";
            case "DATE_YEAR":
                return "${formula_editor_sensor_date_year}";
            case "DATE_MONTH":
                return "${formula_editor_sensor_date_month}";
            case "DATE_DAY":
                return "${formula_editor_sensor_date_day}";
            case "DATE_WEEKDAY":
                return "${formula_editor_sensor_date_weekday}";
            case "TIME_HOUR":
                return "${formula_editor_sensor_time_hour}";
            case "TIME_MINUTE":
                return "${formula_editor_sensor_time_minute}";
            case "TIME_SECOND":
                return "${formula_editor_sensor_time_second}";
            case "FACE_DETECTED":
                return "${formula_editor_sensor_face_detected}";
            case "FACE_SIZE":
                return "${formula_editor_sensor_face_size}";
            case "FACE_X_POSITION":
                return "${formula_editor_sensor_face_x_position}";
            case "FACE_Y_POSITION":
                return "${formula_editor_sensor_face_y_position}";
            case "OBJECT_X":
                return "${formula_editor_object_x}";
            case "OBJECT_Y":
                return "${formula_editor_object_y}";
            case "OBJECT_TRANSPARENCY":
                return "${formula_editor_object_transparency}";
            case "OBJECT_BRIGHTNESS":
                return "${formula_editor_object_brightness}";
            case "OBJECT_COLOR":
                return "${formula_editor_object_color}";
            case "OBJECT_SIZE":
                return "${formula_editor_object_size}";
            case "OBJECT_LAYER":
                return "${formula_editor_object_layer}";
            case "PHIRO_FRONT_LEFT":
                return "${phiro_sensor_front_left}";
            case "PHIRO_FRONT_RIGHT":
                return "${phiro_sensor_front_right}";
            case "PHIRO_SIDE_LEFT":
                return "${phiro_sensor_side_left}";
            case "PHIRO_SIDE_RIGHT":
                return "${phiro_sensor_side_right}";
            case "PHIRO_BOTTOM_LEFT":
                return "${phiro_sensor_bottom_left}";
            case "PHIRO_BOTTOM_RIGHT":
                return "${phiro_sensor_bottom_right}";
            case "DRONE_BATTERY_STATUS":
                return "${formula_editor_sensor_drone_battery_status}";
            case "DRONE_EMERGENCY_STATE":
                return "${formula_editor_sensor_drone_emergency_state}";
            case "DRONE_FLYING":
                return "${formula_editor_sensor_drone_flying}";
            case "DRONE_INITIALIZED":
                return "${formula_editor_sensor_drone_initialized}";
            case "DRONE_USB_ACTIVE":
                return "${formula_editor_sensor_drone_usb_active}";
            case "DRONE_USB_REMAINING_TIME":
                return "${formula_editor_sensor_drone_usb_remaining_time}";
            case "DRONE_CAMERA_READY":
                return "${formula_editor_sensor_drone_camera_ready}";
            case "DRONE_RECORD_READY":
                return "${formula_editor_sensor_drone_record_ready}";
            case "DRONE_RECORDING":
                return "${formula_editor_sensor_drone_recording}";
            case "DRONE_NUM_FRAMES":
                return "${formula_editor_sensor_drone_num_frames}";
            case "COLLIDES_WITH_EDGE":
                return "${formula_editor_function_collides_with_edge}";
            case "COLLIDES_WITH_FINGER":
                return "${formula_editor_function_collides_with_edge}";
            case "OBJECT_X_VELOCITY":
                return "${formula_editor_object_x_velocity}";
            case "OBJECT_Y_VELOCITY":
                return "${formula_editor_object_y_velocity}";
            case "OBJECT_ANGULAR_VELOCITY":
                return "${formula_editor_object_angular_velocity}";
            case "OBJECT_BACKGROUND_NUMBER":
                return "${formula_editor_object_background_number}";
            case "OBJECT_BACKGROUND_NAME":
                return "${formula_editor_object_background_name}";
            case "NFC_TAG_ID":
                return "${formula_editor_nfc_tag_id}";
            case "NFC_TAG_MESSAGE":
                return "${formula_editor_nfc_tag_message}";
            case "OBJECT_ROTATION":
                return "${formula_editor_object_rotation}";
            case "OBJECT_LOOK_NUMBER":
                return "${formula_editor_object_look_number}";
            case "OBJECT_LOOK_NAME":
                return "${formula_editor_object_look_name}";
            case "FINGER_X":
                return "${formula_editor_function_finger_x}";
            case "FINGER_Y":
                return "${formula_editor_function_finger_y}";
            case "FINGER_TOUCHED":
                return "${formula_editor_function_is_finger_touching}";
            case "MULTI_FINGER_X":
                return "${formula_editor_function_multi_finger_x}";
            case "MULTI_FINGER_Y":
                return "${formula_editor_function_multi_finger_y}";
            case "LAST_FINGER_INDEX":
                return "${formula_editor_function_index_of_last_finger}";
            case "MULTI_FINGER_TOUCHED":
                return "${formula_editor_function_is_multi_finger_touching}";
            case "NXT_SENSOR_1":
                return "${formula_editor_sensor_lego_nxt_1}";
            case "NXT_SENSOR_2":
                return "${formula_editor_sensor_lego_nxt_2}";
            case "NXT_SENSOR_3":
                return "${formula_editor_sensor_lego_nxt_3}";
            case "NXT_SENSOR_4":
                return "${formula_editor_sensor_lego_nxt_4}";
            case "EV3_SENSOR_1":
                return "${formula_editor_sensor_lego_ev3_1}";
            case "EV3_SENSOR_2":
                return "${formula_editor_sensor_lego_ev3_2}";
            case "EV3_SENSOR_3":
                return "${formula_editor_sensor_lego_ev3_3}";
            case "EV3_SENSOR_4":
                return "${formula_editor_sensor_lego_ev3_4}";
            case "GAMEPAD_A_PRESSED":
                return "${formula_editor_sensor_gamepad_a_pressed}";
            case "GAMEPAD_B_PRESSED":
                return "${formula_editor_sensor_gamepad_b_pressed}";
            case "GAMEPAD_UP_PRESSED":
                return "${formula_editor_sensor_gamepad_up_pressed}";
            case "GAMEPAD_DOWN_PRESSED":
                return "${formula_editor_sensor_gamepad_down_pressed}";
            case "GAMEPAD_LEFT_PRESSED":
                return "${formula_editor_sensor_gamepad_left_pressed}";
            case "GAMEPAD_RIGHT_PRESSED":
                return "${formula_editor_sensor_gamepad_right_pressed}";
            case "OBJECT_DISTANCE_TO":
                return "$formula_editor_object_distance_to";
            default:
                return operator;
        }
    }
}
