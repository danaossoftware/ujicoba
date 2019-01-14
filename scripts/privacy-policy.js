$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/quiz/browsernotsupported.html";
        return;
    }*/
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == "0") {
                initialize();
            } else {
                window.location.href = "http://ilatih.com/quiz";
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
});

function initialize() {
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
}