<?php
$userId = $_GET["user-id"];
session_start();
$_SESSION["dnquiz_user_id"] = $userId;