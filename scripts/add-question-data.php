<?php
$userId = $_POST["user-id"];
$questionIds = $_POST["question-ids"];
$answerTypes = $_POST["answer-types"];
$scores = $_POST["scores"];
$wrongAnswerPositions = $_POST["wrong-answer-positions"];
$answers = $_POST["answers"];
$json = "[";
for ($i=0; $i<sizeof($questionIds); $i++) {
    $questionId = $questionIds[$i];
    $answerType = $answerTypes[$i];
    $score = $scores[$i];
    $wrongAnswerPosition = $wrongAnswerPositions[$i];
    $answer = $answers[$i];
    $json .= ("{\"questionId\": \"" . $questionId . "\", \"answerType\": \"" . $answerType . "\", \"score\": \"" . $score . "\", \"wrongAnswerPositions\": \"" . $wrongAnswerPosition . "\", \"answers\": \"" . $answer . "\"}, ");
}
$json = substr($json, 0, strlen($json)-2);
$json .= "]";
include 'db.php';
$results = $c->query("SELECT * FROM question_data WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $c->query("UPDATE question_data SET data='" . $json . "' WHERE user_id='" . $userId . "'");
} else {
    $c->query("INSERT INTO question_data (id, user_id, data) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $json . "')");
}