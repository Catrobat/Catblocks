package tools;

import java.util.LinkedList;
import java.util.List;

public class Scene {
    private List<Object> objectList;
    private String name;

    public Scene(String name) {
        objectList = new LinkedList<>();
        this.name = name;
    }

    String getName(){
        return name;
    }

    void setName(String name){
        this.name = name;
    }

    void addObject(Object object){
        objectList.add(object);
    }

    List<Object> getObjects() {
        return objectList;
    }
}
