<?php
$imgData = $_POST["img-data"];
$imgFileName = $_POST["img-file-name"];
$imgData = base64_decode(explode(",", $imgData)[1]);
$f = fopen("../../backend/userdata/imgs/" . $imgFileName, "w");
fwrite($f, $imgData);
fflush($f);
fclose($f);