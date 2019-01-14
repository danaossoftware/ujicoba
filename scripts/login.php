<?php
$email = $_GET["email"];
$password = $_GET["password"];
$rememberMe = $_GET["remember-me"];
include 'db.php';
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    session_start();
    $_SESSION["dnquiz_user_id"] = $results->fetch_assoc()["id"];
    $_SESSION["dnquiz_email"] = $email;
    $_SESSION["dnquiz_password"] = $password;
    if ($rememberMe) {
        $params = session_get_cookie_params();
        $expiryDate = 14; //Expiry date, in days
        setcookie(session_name(), $_COOKIE[session_name()], time() + $expiryDate*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    echo 0;
} else {
    echo -1;
}