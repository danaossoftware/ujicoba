<?php
include 'db.php';
$userId = $_GET["user-id"];
$c->query("UPDATE users SET confirmed=1 WHERE id='" . $userId . "'");