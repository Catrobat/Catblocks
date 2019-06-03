package tools;

import java.util.LinkedList;
import java.util.List;

class Script {

    private String name;
    private List<Block> blockList;

    Script(String name) {
        blockList = new LinkedList<>();
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
}
