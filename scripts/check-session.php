<?php
session_start();
if (isset($_SESSION["dnquiz_user_id"])) {
    echo 0;
} else {
    echo -1;
}