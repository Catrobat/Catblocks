<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . 'code.xml')) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        copy('uploads/code.xml', getcwd() . '/code.xml');
        header("Refresh:0; url=index.html");
    } else {
        echo "Sorry, there was an error uploading your file.";
    }


}
?> 