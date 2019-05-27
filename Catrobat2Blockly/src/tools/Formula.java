package tools;

public class Formula {
    Formula left;
    Formula right;
    String value;

    public Formula() {
        this.value = "";
        this.left = null;
        this.right = null;
    }

    public Formula getLeft() {
        return left;
    }

    public void setLeft(Formula left) {
        if(this.left == null){
            this.left = left;
        }else{

            this.left.setLeft(left);
        }
    }

    public Formula getRight() {
        return right;
    }

    public void setRight(Formula right) {
        if(this.right == null){
            this.right = right;
        }else{

            this.right.setRight(right);
        }
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
