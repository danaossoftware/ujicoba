<?php
$courseId = $_GET["course_id"];
$chapterId = $_GET["chapter_id"];
include 'db.php';
$results = $c->query("SELECT * FROM questions WHERE course_id='" . $courseId . "' AND bab_id='" . $chapterId . "'");
if ($results && $results->num_rows > 0) {
    $questions = [];
    while ($row = $results->fetch_assoc()) {
        $question = ("{\"id\": \"" . $row["id"] . "\", \"question\": \"" . $row["question"] . "\", \"course_id\": \"" . $row["course_id"] . "\", \"chapter_id\": \"" . $row["bab_id"] . "\", \"answers\": \"" . $row["answers"] . "\", \"correct_answer\": \"" . $row["correct_answer"] . "\", \"picture_url\": \"" . $row["picture_url"] . "\", \"video_url\": \"" . $row["video_url"] . "\", \"type\": \"" . $row["type"] . "\", \"audio_url\": \"" . $row["audio_url"] . "\"}, ");
        array_push($questions, $question);
    }
    shuffle($questions);
    $response = "[";
    foreach($questions as $question) {
        $response .= $question;
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    echo $response;
} else {
    echo -1;
}