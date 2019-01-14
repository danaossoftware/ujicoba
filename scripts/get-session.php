<?php
session_start();
$userId = $_SESSION["dnquiz_user_id"];
$email = $_SESSION["dnquiz_email"];
$password = $_SESSION["dnquiz_password"];
echo "{\"userId\": \"" . $userId . "\", \"email\": \"" . $email . "\", \"password\": \"" . $password . "\"}";