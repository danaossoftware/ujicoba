<?php
include 'db.php';
for ($i=0; $i<100; $i++) {
    $c->query("INSERT INTO photos (id, user_id, photo_url) VALUES ('" . uniqid() . "', '5c2db02610213', 'http://ilatih.com/backend/userdata/imgs/orsrc26212.jpg')");
}