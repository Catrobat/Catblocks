import tools.Parser;

import java.io.*;

public class Catrobat2Blockly {

    public static String inputFile;
    public static String outputFile;

    public Catrobat2Blockly() {
    }

    public static void main(String[] args) throws IOException {

        if (args.length == 2){
            // I/O
            inputFile = args[0];
            outputFile = args[1];
        }
        else{
            // Fail
            System.out.println("[ERROR] useage Catrobat2Blockly <inputfile> <outputfile>");
            return;
        }
        Parser parser = new Parser();

        System.out.println(inputFile);
        System.out.println(outputFile);

        BufferedReader reader = new BufferedReader(new FileReader(inputFile));

        String line = "";

        while((line = reader.readLine())!= null){
            parser.parse(line);
        }

        reader.close();

        parser.write(outputFile);
    }
}
