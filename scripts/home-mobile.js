var menuOpened = false;

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-user.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                if (user.confirmed == 0) {
                    $("#confirm-container").css("display", "block");
                }
            }
        }
    });
    loadNews();
});

function openMenu() {
    return;
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

function loadNews() {
    var url = "https://newsapi.org/v2/everything?sources=google-news&q=college&apiKey=4e3f88daccf5458da4e20b17d3c3c77e";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#news").find("*").remove();
            var news = JSON.parse(a);
            var articles = news.articles;
            newsJSON = articles;
            for (var i=0; i<articles.length; i++) {
                var article = articles[i];
                var id = "news-"+i;
                var item = "<div id=\""+id+"\" class=\"card\" style=\"display: none; margin-top: 10px; margin-right: 20px;\">\n" +
                    "<div onclick=\"readNews(this)\" style=\"cursor: pointer; color: black; font-family: SegoeUILight, Arial; font-size: 17px; text-decoration: underline;\">\n" +
                    ""+article.title+"\n" +
                    "</div>\n" +
                    "<div style=\"color: black; font-family: SegoeUILight, Arial; font-size: 14px; margin-top: 5px;\">\n" +
                    ""+article.description+"\n" +
                    "</div>\n" +
                    "</div>";
                $("#news").append(item);
            }
            fadeInNews(0);
            $("#footer").css("display", "flex");
        },
        error: function(a, b, c) {
            alert(b+' '+c);
            $("#footer").css("display", "flex");
        }
    });
}

function fadeInNews(index) {
    if (index >= newsJSON.length) {
        return;
    }
    $("#news-"+index).fadeIn(150, function() {
        index++;
        fadeInNews(index);
    });
}

function readNews(obj) {
    var newsId = $(obj).parent().attr("id");
    var index = parseInt(newsId.substr(newsId.indexOf("-")+1, newsId.length).trim());
    var article = newsJSON[index];
    window.open(article.url, "_blank").focus();
}