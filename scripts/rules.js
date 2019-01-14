const PHP_PATH = "http://ilatih.com/quiz/scripts/";

$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/quiz/browsernotsupported.html";
        return;
    }*/
    var params = location.search;
    params = params.substr(1, params.length);
    var courseId = params.split("&")[0].split("=")[1];
    var chapterId = params.split("&")[1].split("=")[1];
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
    $("#start-exam").on("click", function() {
        window.location.href = "quiz.html?course_id="+courseId+"&chapter_id="+chapterId;
    });
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var settings = parser.parseFromString(a, "text/xml");
            var rulesTag = settings.getElementsByTagName("rules")[0];
            var rules = rulesTag.childNodes[0].nodeValue;
            rules = rules.split("@").join("<br/>");
            $("#rules").html(rules);
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
});

function contactUs() {
    window.location.href = "http://ilatih.com/quiz/contact-us.html";
}

function openFAQPage() {
    window.location.href = "http://ilatih.com/quiz/faq.html";
}

function openHelpPage() {
    window.location.href = "http://ilatih.com/quiz/help.html";
}