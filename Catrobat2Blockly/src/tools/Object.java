package tools;

import java.util.LinkedList;
import java.util.List;

public class Object {
    private List<Script> scriptList;
    private String name;

    public Object(String name) {
        scriptList = new LinkedList<>();
        this.name = name;
    }

    public void addScript(Script script){
        scriptList.add(script);
    }
}
