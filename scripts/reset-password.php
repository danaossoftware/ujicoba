<?php
include 'db.php';
$email = $_GET["email"];
$password = $_GET["password"];
$c->query("UPDATE users SET password='" . $password . "' WHERE email='" . $email . "'");