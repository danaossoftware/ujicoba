var menuOpened = false;

$(document).ready(function() {
    loadChapters();
});

function openMenu() {
    if (!menuOpened) {
        $("#menu").animate({
            left: "0"
        }, {
            duration: 300,
            complete: function() {
                menuOpened = true;
            }
        });
    } else {
        $("#menu").animate({
            left: "-200px"
        }, {
            duration: 300,
            complete: function() {
                menuOpened = false;
            }
        });
    }
}

function loadChapters() {
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
                    items = "";
                    while (j > 0) {
                        var chapter = chapters[k];
                        var name = chapter.name;
                        items += "<div style=\"display: flex; flex-flow: row nowrap; margin-top: 5px;\" class=\"chapter-link\">\n" +
                            "<a onclick=\"return false;\" href='http://ilatih.com/quiz/rules-mobile.html?course-id="+courseId+"&chapter-id="+chapter.id+"' style=\"text-decoration: none; color: black;\">"+name+"</a>\n" +
                            "</div>";
                        k++;
                        j--;
                        len--;
                    }
                    $("#chapters").append(items);
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
}

function setChapterLinkClickListener() {
    $(".chapter-link").on("click", function() {
        $(".chapter-link").off("click");
        var link = $(this).find("a").prop("href");
        window.location.href = link;
    });
}