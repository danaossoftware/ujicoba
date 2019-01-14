<?php
$f = fopen("../../backend/systemdata/settings.xml", "r");
$size = fstat($f)["size"];
$data = fread($f, $size);
fclose($f);
echo $data;