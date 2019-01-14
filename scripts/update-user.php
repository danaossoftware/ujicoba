<?php
include 'db.php';
$userId = $_POST["user-id"];
$name = $_POST["name"];
$profilePicturePath = $_POST["img-path"];
$birthday = $_POST["birthday"];
$gender = $_POST["gender"];
$city = $_POST["city"];
$ethnic = $_POST["ethnic"];
$height = $_POST["height"];
$summary = $_POST["summary"];
$currentRoutine = $_POST["current-routine"];
$myPassion = $_POST["my-passion"];
if ($profilePicturePath != 'noupdate') {
    $c->query("UPDATE users SET name='" . $name . "', profilePicture='" . $profilePicturePath . "', birthday='" . $birthday . "', gender='" . $gender . "', city='" . $city . "', ethnic='" . $ethnic . "', height='" . $height . "', summary='" . $summary . "', currentRoutine='" . $currentRoutine . "', myPassion='" . $myPassion . "' WHERE id='" . $userId . "'");
} else {
    $c->query("UPDATE users SET name='" . $name . "', birthday='" . $birthday . "', gender='" . $gender . "', city='" . $city . "', ethnic='" . $ethnic . "', height='" . $height . "', summary='" . $summary . "', currentRoutine='" . $currentRoutine . "', myPassion='" . $myPassion . "' WHERE id='" . $userId . "'");
}