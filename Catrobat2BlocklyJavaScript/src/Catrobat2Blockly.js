function loadXMLDoc() {
    import {parseFile} from "./tools/Parser";

    var xmlhttp;
    xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "../code.xml", true);
    xmlhttp.responseType = 'text';
    xmlhttp.send();

    xmlhttp.onload = function () {
        //console.log(xmlhttp.responseText);
        console.log(xmlhttp.response.length);
        parseFile(xmlhttp);
        //let txtFile = new File(["foo"],"../catblocks.xml");
        //txtFile.writeFile(xmlhttp.responseText);
        //txtFile.close();
        //var file = new File([txt], "../catblocks.xml", {type: "application/octet-stream"});
        //var blobUrl = (URL || webkitURL).createObjectURL(file);
        //window.location = blobUrl;

        //var dataJSON = JSON.stringify(xmlhttp.responseText);
        //writeToFile(xmlhttp.responseText, "../catblocks.xml");

    }

}



