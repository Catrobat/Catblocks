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

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public void addObject(Object object){
        objectList.add(object);
    }

    public List<Object> getObjects() {
        return objectList;
    }
}
