function loadXMLDoc() {

    //console.log("HERE");
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "../code.xml", true);
    //xmlhttp.responseType = 'text';
    xmlhttp.send();

    xmlhttp.onload = function () {
        //console.log(xmlhttp.response.length);
        parseFile(xmlhttp.responseXML);

    }

}
