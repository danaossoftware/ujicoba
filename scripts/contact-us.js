$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/ujicoba/browsernotsupported.html";
        return;
    }*/
    /*$.ajax({
        type: 'GET',
        url: PHP_PATH+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == "0") {
                initialize();
            } else {
                window.location.href = "http://ilatih.com/ujicoba";
            }
        },
        error: function(a, b, c) {
        }
    });*/
    initialize();
});

function initialize() {
    loadSettings();
    $("#home").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/home.html";
    });
    $("#latihan").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/home.html?page=1";
    });
    $("#profile").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/profile.html";
    });
    $("#help").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/help.html";
    });
    $("#contact-us").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/contact-us.html";
    });
    $("#log-out").on("click", function() {
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'logout.php',
            dataType: 'text',
            cache: false,
            success: function(a) {
                window.location.href = "http://ilatih.com/ujicoba";
            },
            error: function(a, b, c) {
                alert(a+' '+c);
            }
        });
    });
}

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            var parser = new DOMParser();
            var settings = parser.parseFromString(a, "text/xml");
            var admin = settings.getElementsByTagName("admin")[0];
            var email = "";
            if (admin.getElementsByTagName("email")[0].childNodes[0] != null) {
                email = admin.getElementsByTagName("email")[0].childNodes[0].nodeValue;
            }
            var phone = "";
            if (admin.getElementsByTagName("phone")[0].childNodes[0] != null) {
                phone = admin.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
            }
            var address = "";
            if (admin.getElementsByTagName("address")[0].childNodes[0] != null) {
                address = admin.getElementsByTagName("address")[0].childNodes[0].nodeValue;
            }
            $("#report-email").html(email);
            $("#report-phone").html(phone);
            $("#report-address").html(address);
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function openSocialMedia(type) {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var settings = parser.parseFromString(a, "text/xml");
            var links = settings.getElementsByTagName("links")[0];
            var twitterLink = links.getElementsByTagName("twitter")[0].childNodes[0].nodeValue;
            var facebookLink = links.getElementsByTagName("facebook")[0].childNodes[0].nodeValue;
            var googlePlusLink = links.getElementsByTagName("googlePlus")[0].childNodes[0].nodeValue;
            var linkedInLink = links.getElementsByTagName("linkedIn")[0].childNodes[0].nodeValue;
            var instagramLink = links.getElementsByTagName("instagram")[0].childNodes[0].nodeValue;
            if (type == "twitter") {
                window.open(twitterLink, "_blank").focus();
            } else if (type == "facebook") {
                window.open(facebookLink, "_blank").focus();
            } else if (type == "googlePlus") {
                window.open(googlePlusLink, "_blank").focus();
            } else if (type == "linkedIn") {
                window.open(linkedInLink, "_blank").focus();
            } else if (type == "instagram") {
                window.open(instagramLink, "_blank").focus();
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function sendReport() {
    $("#error").css("display", "none");
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        $("#error").html("Mohon lakukan verifikasi captcha sebelum melanjutkan");
        $("#error").css("display", "block");
        return;
    }
    var email = $("#email").val();
    var report = $("#report").val();
    if (email == '' || report == '') {
        $("#error").html("Mohon isi semua data dengan benar");
        $("#error").css("display", "block");
        return;
    }
    var fd = new FormData();
    fd.append("email", email);
    fd.append("report", report);
    $.ajax({
        type: 'POST',
        url: PHP_PATH+'add-report.php',
        processData: false,
        contentType: false,
        data: fd,
        cache: false,
        success: function(a) {
            alert("Laporan berhasil dikirim");
            window.location.href = "http://ilatih.com/ujicoba/home.html";
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function contactUs() {
    window.location.href = "http://ilatih.com/ujicoba/contact-us.html";
}

function openFAQPage() {
    window.location.href = "http://ilatih.com/ujicoba/faq.html";
}

function openHelpPage() {
    window.location.href = "http://ilatih.com/ujicoba/help.html";
}