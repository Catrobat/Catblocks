package tools;

class Formula {
    private Formula left;
    private Formula right;
    private String value;

    Formula() {
        this.value = "";
        this.left = null;
        this.right = null;
    }

    Formula getLeft() {
        return left;
    }

    void setLeft(Formula left) {
        if(this.left == null){
            this.left = left;
        }else{

            this.left.setLeft(left);
        }
    }

    Formula getRight() {
        return right;
    }

    void setRight(Formula right) {
        if(this.right == null){
            this.right = right;
        }else{

            this.right.setRight(right);
        }
    }

    void setValue(String value) {
        this.value = value;
    }

    String getValue() {
        return value;
    }
}
