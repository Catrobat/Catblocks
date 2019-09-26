import tools.Parser;

import java.io.*;

public class Catrobat2Blockly {

    private static String inputFile;
    private static String outputFile;

    public Catrobat2Blockly() {
    }

    public static void main(String[] args) throws IOException {

        String filename = "code.xml";

        File file = new File(filename);
        if(!file.exists()){
            System.out.println("[ERROR] cannot find file");
            System.exit(-1);
        }
        Parser parser = new Parser();
        parser.parseFile(file.getName());
        parser.write("test.xml");
        return;
    }
}
