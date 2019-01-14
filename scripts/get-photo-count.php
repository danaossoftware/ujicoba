<?php
include 'db.php';
$userId = $_GET["user-id"];
echo $c->query("SELECT * FROM photos WHERE user_id='" . $userId . "'")->num_rows;