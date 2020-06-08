package tools;

import java.util.LinkedList;
import java.util.List;

class Object {
    private List<Script> scriptList;
    private List<CatFile> soundList;
    private List<CatFile> lookList;
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
        CatFile look = new CatFile(name, location);
        lookList.add(look);
    }

    void addSound(String name, String location){
        CatFile sound = new CatFile(name, location);
        soundList.add(sound);
    }

    String getName() {
        return name;
    }

    List<Script> getScriptList(){
        return scriptList;
    }

    List<CatFile> getSoundList(){
        return soundList;
    }

    List<CatFile> getLookList() {
        return lookList;
    }
}
