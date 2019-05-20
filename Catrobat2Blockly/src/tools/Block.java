package tools;

import java.util.LinkedList;
import java.util.List;

public class Block {
    private String name;
    private List<Block> subblock;
    private List<Block> subblock2;

    private boolean inSTMT1;
    private boolean inSTMT2;

    public Block(String name_) {
        subblock = new LinkedList<>();
        subblock2 = new LinkedList<>();

        inSTMT1 = false;
        inSTMT2 = false;

        this.name = name_;
    }

    public String getName() {
        return name;
    }

    public void addSubblock(Block block){
        subblock.add(block);
    }

    public List<Block> getSubblock() {
        return subblock;
    }

    public void setSubblock(List<Block> subblock) {
        this.subblock = subblock;
    }

    public List<Block> getSubblock2() {
        return subblock2;
    }

    public void setSubblock2(List<Block> subblock2) {
        this.subblock2 = subblock2;
    }

    public void addSubblock2(Block block){
        if(this.name.equals("IfLogicBeginBrick")){
            System.out.println("Rename");
            this.name = "IfElseLogicBeginBrick";
        }
        subblock2.add(block);
    }

    public boolean isInSTMT1() {
        return inSTMT1;
    }

    public boolean isInSTMT2() {
        return inSTMT2;
    }

    public void workon2() {
        inSTMT2 = !inSTMT2;
    }

    public void workon1() {
        inSTMT1 = !inSTMT1;
    }

    public boolean getworkon1(){
        return inSTMT1;
    }
}
