const PHP_PATH = "http://ilatih.com/ujicoba/scripts/";

$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/ujicoba/browsernotsupported.html";
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
                window.location.href = "http://ilatih.com/ujicoba";
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
});

function initialize() {
    var params = location.search;
    params = params.substr(1, params.length);
    var courseId = params.split("&")[0].split("=")[1];
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-bab-by-course.php',
        data: {'course_id': courseId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var chapters = JSON.parse(a);
                var items = "";
                var j = 4;
                var len = chapters.length;
                if (chapters.length < 4) {
                    j = chapters.length;
                }
                var k = 0;
                for (var i=0; i<chapters.length; i+=4) {
                    items = "<tr>";
                    while (j > 0) {
                        var chapter = chapters[k];
                        var name = chapter.name;
                        items += "<td style=\"padding-left: 30px; padding-right: 30px;\">\n" +
                            "<div style=\"display: flex; flex-flow: row nowrap;\" class=\"chapter-link\">\n" +
                            "<a onclick=\"return false;\" style=\"text-decoration: none; color: black;\" href=\"http://ilatih.com/ujicoba/rules.html?course_id="+courseId+"&chapter_id="+chapter.id+"\">" + name + "</a>\n" +
                            "</div>\n" +
                            "</td>";
                        k++;
                        j--;
                        len--;
                    }
                    items += "</tr>";
                    $("#chapters").find("tbody").append(items);
                    if (len < 0) {
                        break;
                    }
                    j = 4;
                    if (len < 4) {
                        j = len;
                    }
                }
                setChapterLinkClickListener();
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
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

function setChapterLinkClickListener() {
    $(".chapter-link").on("click", function() {
        $(".chapter-link").off("click");
        var link = $(this).find("a").prop("href");
        window.location.href = link;
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