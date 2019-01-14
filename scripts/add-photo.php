<?php
include 'db.php';
$imgData = $_POST["img-data"];
$userId = $_POST["user-id"];
$imgData = base64_decode(explode(",", $imgData)[1]);
$imgFileName = uniqid() . ".png";
$f = fopen("../../backend/userdata/imgs/" . $imgFileName, "w");
fwrite($f, $imgData);
fflush($f);
fclose($f);
$imgURL = "http://ilatih.com/backend/userdata/imgs/" . $imgFileName;
$c->query("INSERT INTO photos (id, user_id, photo_url) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $imgURL . "')");