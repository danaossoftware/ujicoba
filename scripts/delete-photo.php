<?php
include 'db.php';
$userId = $_GET["user-id"];
$imgURL = $_GET["img-url"];
$c->query("DELETE FROM photos WHERE user_id='" . $userId . "' AND photo_url='" . $imgURL . "'");