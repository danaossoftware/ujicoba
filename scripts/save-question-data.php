<?php
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
$f = fopen("question-data", "w");
fwrite($f, $json);
fflush($f);
fclose($f);