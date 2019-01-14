<?php
$courseId = $_GET["course_id"];
include 'db.php';
$results = $c->query("SELECT * FROM bab WHERE course_id='" . $courseId . "'");
if ($results && $results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $response .= ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"course_id\": \"" . $row["course_id"] . "\", \"img_url\": \"" . $row["img_url"] . "\"}, ");
    }
    $response = substr($response, 0, strlen($response) - 2);
    $response .= "]";
    echo $response;
} else {
    echo -2;
}