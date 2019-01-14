<?php
//TODO rename this properties
$settings = simplexml_load_file("../../backend/systemdata/settings.xml");
$mysql = $settings->mysql;
$user = $mysql->dbuser;
$pass = $mysql->dbpass;
$dbname = $mysql->dbname;
$c = mysqli_connect("localhost", $user, $pass);
$c->select_db($dbname);