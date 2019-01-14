<?php
include 'db.php';
$userId = $_GET["user-id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $response = ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"email\": \"" . $row["email"] . "\", \"password\": \"" . $row["password"] . "\", \"profilePictureURL\": \"" . $row["profilePicture"] . "\", \"phone\": \"" . $row["phone"] . "\", \"birthday\": \"" . $row["birthday"] . "\", \"gender\": \"" . $row["gender"] . "\", \"city\": \"" . $row["city"] . "\", \"ethnic\": \"" . $row["ethnic"] . "\", \"height\": \"" . $row["height"] . "\", \"summaryText\": \"" . $row["summary"] . "\", \"currentRoutine\": \"" . $row["currentRoutine"] . "\", \"myPassion\": \"" . $row["myPassion"] . "\", \"lastAnsweredQuestion\": \"" . $row["last_answered_question"] . "\", \"last_correct_question\": \"" . $row["last_correct_question"] . "\", \"lastWrongQuestion\": \"" . $row["last_wrong_question"] . "\"}");
    echo $response;
} else {
    echo -1;
}