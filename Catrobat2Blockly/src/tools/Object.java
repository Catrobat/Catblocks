package tools;

import java.util.LinkedList;
import java.util.List;

class Object {
    private List<Script> scriptList;
    private List<String> soundList;
    private List<Look> lookList;
    private String name;

    Object(String name) {
        scriptList = new LinkedList<>();
        soundList = new LinkedList<>();
        lookList = new LinkedList<>();
        this.name = name;
    }

    void addScript(Script script){
        scriptList.add(script);
    }

    void addLook(String name, String location){
        Look look = new Look(name, location);
        lookList.add(look);
    }

    void addSound(String name){
        soundList.add(name);
    }

    String getName() {
        return name;
    }

    List<Script> getScriptList(){
        return scriptList;
    }

    List<String> getSoundList(){
        return soundList;
    }

    List<Look> getLookList() {
        return lookList;
    }
}
