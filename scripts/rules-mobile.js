$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var courseId = params.split("&")[0].split("=")[1];
    var chapterId = params.split("&")[1].split("=")[1];
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
    $("#start-exam").on("click", function() {
        window.location.href = "http://ilatih.com/ujicoba/quiz-mobile.html?course_id="+courseId+"&chapter_id="+chapterId;
    });
});