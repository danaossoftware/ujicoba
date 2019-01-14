var menuOpened = false;

$(document).ready(function() {
    loadCourses();
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

function loadCourses() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-courses.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                var items = "";
                var j = 4;
                var len = courses.length;
                if (courses.length < 4) {
                    j = courses.length;
                }
                var k = 0;
                for (var i=0; i<courses.length; i+=4) {
                    items = "";
                    while (j > 0) {
                        var course = courses[k];
                        var name = course.name;
                        items += "<div style=\"display: flex; flex-flow: row nowrap; margin-top: 5px;\" class=\"course-link\">\n" +
                            "<a onclick=\"return false;\" href='http://ilatih.com/quiz/chapters-mobile.html?course-id="+course.id+"' style=\"text-decoration: none; color: black;\">"+name+"</a>\n" +
                            "</div>";
                        k++;
                        j--;
                        len--;
                    }
                    items += "";
                    $("#courses").append(items);
                    if (len < 0) {
                        break;
                    }
                    j = 4;
                    if (len < 4) {
                        j = len;
                    }
                }
                setCourseLinkClickListener();
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function setCourseLinkClickListener() {
    $(".course-link").on("click", function() {
        $(".course-link").off("click");
        var link = $(this).find("a").attr("href");
        window.location.href = link;
    });
}