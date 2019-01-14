$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'send-verification-email.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#email-sent-container").css("display", "flex");
            $("#loading-container").css("display", "none");
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
    $("#login").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/login.html";
    });
    $("#signup").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/signup.html";
    });
});