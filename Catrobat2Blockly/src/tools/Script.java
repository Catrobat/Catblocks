package tools;

import java.util.LinkedList;
import java.util.List;

public class Script {

    private String name;
    private List<Block> blockList;

    public Script(String name) {
        blockList = new LinkedList<>();
        this.name = name;
    }

    public void addBlock(Block block){
        blockList.add(block);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Block> getBlocks(){
        return  blockList;
    }
}
