<?php
$userId = $_GET["user-id"];
include 'db.php';
$results = $c->query("SELECT * FROM question_data WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo $results->fetch_assoc()["data"];
} else {
    echo -1;
}