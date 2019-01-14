$(document).ready(function() {
    var params = location.search;
    var userId = params.split("&")[0].split("=")[1];
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'confirm-email.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
    $("#home").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/home.html";
    });
    $("#latihan").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/home.html?page=1";
    });
    $("#profile").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/profile.html";
    });
    $("#help").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/help.html";
    });
    $("#contact-us").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/contact-us.html";
    });
    $("#log-out").on("click", function() {
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'logout.php',
            dataType: 'text',
            cache: false,
            success: function(a) {
                window.location.href = "http://ilatih.com/quiz";
            },
            error: function(a, b, c) {
                alert(a+' '+c);
            }
        });
    });
});