<?php
include 'db.php';
$email = $_POST["email"];
$report = $_POST["report"];
$c->query("INSERT INTO reports (id, email, report) VALUES ('" . uniqid() . "', '" . $email . "', '" . $report . "')");