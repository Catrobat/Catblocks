package tools;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

class Script {

    private String name;
    private List<Block> blockList;
    private Map<String,String> formValues;
    private String curr;

    Script(String name) {
        blockList = new LinkedList<>();
        formValues = new HashMap<>();
        this.name = name;
    }

    void addBlock(Block block){
        blockList.add(block);
    }

    String getName() {
        return name;
    }

    List<Block> getBlocks(){
        return  blockList;
    }

    void addFormValues(String val) {
        this.formValues.put("DROPDOWN", val);
    }

    void setCurr(String curr) {
        this.curr = curr;
    }

    String getField() {
        return formValues.get(this.curr);
    }
}
