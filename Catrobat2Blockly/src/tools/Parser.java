package tools;

import java.io.*;
import java.util.LinkedList;
import java.util.List;

public class Parser {

    private static final String BRICK_DEF = "<brick ";
    private static final String BRICK_TYPE = "type=";

    private List<String> blocks;

    public Parser() {
        blocks = new LinkedList<>();
    }

    public void parse(String line) {
        if(line.contains(BRICK_DEF) && line.contains(BRICK_TYPE)){
            String split = line.split(BRICK_TYPE)[1];

            blocks.add(split.split("\"")[1]);
        }
    }

    public void write(String outFile) throws IOException {
        PrintWriter writer = new PrintWriter(outFile);
        writer.println("<xml xmlns=\"http://www.w3.org/1999/xhtml\">");

        String filePath = new File("").getAbsolutePath().split("Catrobat2Blockly")[0];

        for(String block : blocks){
            String path = filePath + "scratch-blocks-develop/tests/catblocks/" + block + ".xml";

            BufferedReader reader = new BufferedReader(new FileReader(path));

            String line = "";

            while((line = reader.readLine())!= null){
                if(!line.contains("xml")){
                    writer.println(line);
                }
            }

            reader.close();
        }

        writer.println("</xml>");
        writer.close();
    }
}
