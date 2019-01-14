const PHP_PATH = "http://ilatih.com/ujicoba/scripts/";

$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/ujicoba/browsernotsupported.html";
        return;
    }*/
    $("#remember-me").on("click", function() {
        var checked = $("#remember-me-checkbox").prop("checked");
        checked = !checked;
        $("#remember-me-checkbox").prop("checked", checked);
    });
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Logged in
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    window.location.href = "home-mobile.html";
                } else {
                    window.location.href = "home.html";
                }
            }
        }
    });
});

function login() {
    $("#error").html("");
    $("#error").css("display", "none");
    $(".login-form").css("height", "330px");
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == '') {
        $("#error").html("Mohon isi email");
        $("#error").css("display", "block");
        $(".login-form").css("height", "360px");
        $("#login").css("margin-top", "10px");
        return;
    }
    if (password == '') {
        $("#error").html("Mohon isi kata sandi");
        $("#error").css("display", "block");
        $(".login-form").css("height", "360px");
        $("#login").css("margin-top", "10px");
        return;
    }
    var rememberMe = $("#remember-me-checkbox").prop("checked");
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'login.php',
        dataType: 'text',
        data: {'email': email, 'password': password, 'remember-me': rememberMe},
        cache: false,
        success: function(a) {
            if (a == 0) {
                window.location.href = "home.html";
            } else if (a == -1) {
                $("#error").html("Email atau kata sandi salah");
                $("#error").css("display", "block");
                $(".login-form").css("height", "360px");
                $("#login").css("margin-top", "10px");
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function signup() {
    window.location = "signup.html";
}