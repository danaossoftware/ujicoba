<?php
include 'db.php';
$questionId = $_GET["id"];
$results = $c->query("SELECT * FROM questions WHERE id='" . $questionId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    echo "{\"id\": \"" . $row["id"] . "\", \"question\": \"" . $row["question"] . "\", \"course_id\": \"" . $row["course_id"] . "\", \"bab_id\": \"" . $row["bab_id"] . "\", \"answers\": \"" . $row["answers"] . "\", \"reason\": \"" . $row["reason"] . "\", \"type\": \"" . $row["type"] . "\", \"correct_answer\": \"" . $row["correct_answer"] . "\", \"picture_url\": \"" . $row["picture_url"] . "\", \"video_url\": \"" . $row["video_url"] . "\"}";
} else {
    echo -1;
}