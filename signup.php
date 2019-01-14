<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $password = $_POST["password"];
    include 'db.php';
    if (!$c->select_db("quiz")) {
        echo -2;
        return;
    }
    // Check if user already registered
    if ($c->query("SELECT * FROM users WHERE email='" . $email . "'")->num_rows > 0) {
        echo -3;
        return;
    }
    // Check if phone already used
    if ($c->query("SELECT * FROM users WHERE phone='" . $phone . "'")->num_rows > 0) {
        echo -4;
        return;
    }
    if ($c->query("INSERT INTO users (id, name, email, password, phone) VALUES ('" . uniqid() . "', '" . $name . "', '" . $email . "', '" . $password . "', '" . $phone . "')")) {
        echo "success";
    } else {
        echo "failed";
    }
?>