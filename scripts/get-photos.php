<?php
include 'db.php';
$userId = $_GET["user-id"];
$start = $_GET["start"];
$length = $_GET["length"];
$results = $c->query("SELECT * FROM photos WHERE user_id='" . $userId . "' LIMIT " . $start . ", " . $length . "");
if ($results && $results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $response .= ("{\"id\": \"" . $row["id"] . "\", \"userId\": \"" . $row["user_id"] . "\", \"photoUrl\": \"" . $row["photo_url"] . "\"}, ");
    }
    $response = substr($response, 0, strlen($response) - 2);
    $response .= "]";
    echo $response;
} else {
    echo -1;
}