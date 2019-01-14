<?php
$email = $_GET["email"];
$password = $_GET["password"];
$idNumber = $_GET["id-number"];
$rememberMe = $_GET["remember-me"];
include 'db.php';
include 'mail.php';
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$results = $c->query("SELECT * FROM users WHERE idnumber='" . $idNumber . "'");
if ($results && $results->num_rows > 0) {
    echo -3;
    return;
}
$userId = uniqid();
if ($c->query("INSERT INTO users (id, email, password, idnumber) VALUES ('" . $userId . "', '" . $email . "', '" . $password . "', '" . $idNumber . "')")) {
    $url = "http://ilatih.com/quiz/scripts/confirm-email.html?id=" . $userId;
    sendMail("admin@ilatih.com", $email, "Konfirmasi email Anda untuk akun iLatih Anda", "<br/><img src='http://ilatih.com/quiz/img/logo.png' width='80px' height='80px'><br/><br/><br/>Selamat datang!<br/>Konfirmasi email Anda dengan meng-klik URL berikut untuk menyelesaikan registrasi akun iLatih Anda.<br/><a href='" . $url . "'>" . $url . "</a><br/>Jika Anda tidak mendaftar iLatih sebelumnya, abaikan email ini.<br/>Tim iLatih");
    session_start();
    $_SESSION["dnquiz_user_id"] = $userId;
    $_SESSION["dnquiz_email"] = $email;
    $_SESSION["dnquiz_password"] = $password;
    if ($rememberMe) {
        $params = session_get_cookie_params();
        $expiryDate = 14; //Expiry date, in days
        setcookie(session_name(), $_COOKIE[session_name()], time() + $expiryDate*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    echo 0;
} else {
    echo -2;
}