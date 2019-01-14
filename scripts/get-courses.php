<?php
include 'db.php';
$results = $c->query("SELECT * FROM courses");
if ($results && $results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $response .= ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"lecturer\": \"" . $row["lecturer"] . "\"}, ");
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    echo $response;
} else {
    echo -1;
}