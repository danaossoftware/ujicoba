$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var email = params.split("&")[0].split("=")[1];
    $("#login").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/login.html";
    });
    $("#signup").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/signup.html";
    });
    $("#reset-password").on("click", function() {
        $("#error").css("display", "none");
        var password = $("#password").val();
        var repeatedPassword = $("#repeated-password").val();
        if (password == '' || repeatedPassword == '') {
            return;
        }
        if (password != repeatedPassword) {
            $("#error").html("Kata sandi tidak cocok");
            $("#error").css("display", "block");
            return;
        }
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'reset-password.php',
            data: {'email': email, 'password': password},
            dataType: 'text',
            cache: false,
            success: function(a) {
                window.location.href = "http://ilatih.com/quiz/password-changed.html";
            },
            error: function(a, b, c) {
                alert(b+' '+c);
            }
        });
    });
});