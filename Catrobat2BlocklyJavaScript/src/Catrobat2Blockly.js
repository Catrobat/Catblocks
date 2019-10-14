function loadXMLDoc() {
    let request = new XMLHttpRequest();

    request.open("GET", "../code.xml", true);
    request.send();

    request.onload = function () {
        parseFile(request.responseXML);
    }
}
