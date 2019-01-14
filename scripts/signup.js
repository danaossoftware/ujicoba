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
                window.location.href = "home.html";
            }
        }
    });
});

function login() {
    window.location = "login.html";
}

function signup() {
    window.location = "signup.html";
}

function signupAsUser() {
    $("#error").html("");
    $("#error").css("display", "none");
    $("#signup-form").css("height", "330px");
    $("#signup").css("margin-top", "20px");
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmedPassword = $("#confirm-password").val();
    var idNumber = $("#identifier").val();
    if (email == '' || password == '' || confirmedPassword == '' || idNumber == '') {
        return;
    }
    if (password != confirmedPassword) {
        $("#error").html("Kata sandi tidak sama");
        $("#error").css("display", "block");
        return;
    }
    var rememberMe = $("#remember-me-checkbox").prop("checked");
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'signup.php',
        data: {'email': email, 'password': password, 'id-number': idNumber, 'remember-me': rememberMe},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location = "home.html";
            } else if (a == -1) {
                // User exists
                $("#signup-form").css("height", "350px");
                $("#error").html("Email sudah digunakan");
                $("#error").css("display", "block");
                $("#signup").css("margin-top", "10px");
            } else if (a == -3) {
                // ID number used
                $("#signup-form").css("height", "350px");
                $("#error").html("Nomor induk sudah digunakan");
                $("#error").css("display", "block");
                $("#signup").css("margin-top", "10px");
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}