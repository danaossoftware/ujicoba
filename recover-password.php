<?php
	include 'db.php';
	if (!$c->select_db("quiz")) {
		echo -2;
		return;
	}
	$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
	if (!$results) {
		echo -3;
		return;
	}
	if ($results->num_rows > 0) {
		$row = $results->fetch_assoc();
		
	} else {
		echo -4;
	}
?>