import tools.Parser;

import java.io.*;

public class Catrobat2Blockly {

    private static String inputFile;
    private static String outputFile;

    public Catrobat2Blockly() {
    }

    public static void main(String[] args) throws IOException {

        checkArgs(args);

        Parser parser = new Parser();
        parser.parseFile(inputFile);
        parser.update();
        parser.write(outputFile);
    }

    private static void checkArgs(String[] args) {
        if (args.length == 2){
            // I/O
            inputFile = args[0];
            outputFile = args[1];
        }
        else{
            // Fail
            System.out.println("[ERROR] useage Catrobat2Blockly <inputfile> <outputfile>");
            System.exit(-1);
        }
    }
}
