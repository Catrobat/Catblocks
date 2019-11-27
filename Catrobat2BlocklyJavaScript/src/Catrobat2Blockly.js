function loadXMLDoc() {
    ['../code.xml'].forEach(remoteFile => {
        fetch(remoteFile)
            .then(res => res.text())
            .then(str => (new DOMParser).parseFromString(str, 'text/xml'))
            .then(xml => {
                console.log(xml);
                parseFile(xml);
            });
    });
}
