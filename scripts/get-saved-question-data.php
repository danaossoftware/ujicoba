<?php
$f = fopen("question-data", "r");
$size = fstat($f)["size"];
$json = fread($f, $size);
fclose($f);
echo $json;