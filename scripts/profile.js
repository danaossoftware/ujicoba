var photoQueryStart = 0;
var photoQueryLength = 36;
var photoCount = 0;
var userId = "";
var months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/quiz/browsernotsupported.html";
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
                window.location.href = "http://ilatih.com/quiz";
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
});

function initialize() {
    $("#about-tab").on("click", function() {
        $("#indicator").animate({
            marginLeft: "0",
            width: "108px"
        }, 400);
        $("#about-tab-text").css("color", "#1a1e21");
        $("#photo-tab-text").css("color", "#bdbdbd");
        $("#scores-tab-text").css("color", "#bdbdbd");
        if ($("#photo-panel-container").css("display") == "block") {
            $("#photo-panel-container").fadeOut(200, function() {
                $("#about-panel").fadeIn(200);
            });
        } else if ($("#scores-panel-container").css("display") == "block") {
            $("#scores-panel-container").fadeOut(200, function() {
                $("#about-panel").fadeIn(200);
            });
        }
    });
    $("#photo-tab").on("click", function() {
        $("#indicator").animate({
            marginLeft: "110px",
            width: "69px"
        }, 400);
        $("#about-tab-text").css("color", "#bdbdbd");
        $("#photo-tab-text").css("color", "#1a1e21");
        $("#scores-tab-text").css("color", "#bdbdbd");
        if ($("#about-panel").css("display") == "flex") {
            $("#about-panel").fadeOut(200, function() {
                $("#photo-panel-container").fadeIn(200);
            });
        } else if ($("#scores-panel-container").css("display") == "block") {
            $("#scores-panel-container").fadeOut(200, function() {
                $("#photo-panel-container").fadeIn(200);
            });
        }
    });
    $("#scores-tab").on("click", function() {
        $("#indicator").animate({
            marginLeft: "185px",
            width: "115px"
        }, 400);
        $("#about-tab-text").css("color", "#bdbdbd");
        $("#photo-tab-text").css("color", "#bdbdbd");
        $("#scores-tab-text").css("color", "#1a1e21");
        if ($("#about-panel").css("display") == "flex") {
            $("#about-panel").fadeOut(200, function() {
                $("#scores-panel-container").fadeIn();
            });
        } else if ($("#photo-panel-container").css("display") == "block") {
            $("#photo-panel-container").fadeOut(200, function() {
                $("#scores-panel-container").fadeIn();
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var session = JSON.parse(a);
            userId = session.userId;
            $("#photo-panel").find("*").remove();
            getUserInfo();
            getPhotoCount();
            getQuestionData();
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
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
}

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-user-by-id.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var user = JSON.parse(a);
            if (user.name != '') {
                $("#display-name").html(user.name);
            } else {
                $("#display-name").html("Tanpa Nama");
            }
            var profilePictureURL = user.profilePictureURL;
            if (profilePictureURL != '') {
                $("#profile-picture").attr("src", profilePictureURL);
            }
            var birthdayMillis = user.birthday;
            if (birthdayMillis != '') {
                var birthday = new Date(parseInt(birthdayMillis));
                var age = calculateAge(birthdayMillis);
                $("#age").html(age);
                $("#age-2").html(age+" Tahun");
                var day = birthday.getDate();
                var month = birthday.getMonth();
                var year = birthday.getFullYear();
                if (day < 10) {
                    day = "0"+day;
                }
                $("#birthday").html(day+" "+months[month]+" "+year);
            } else {
                $("#age").html("24");
                $("#age-2").html("24 Tahun");
                $("#birthday").html("-");
            }
            if (user.gender == 'L') {
                $("#gender").attr("src", "img/male.png");
            } else if (user.gender == 'P') {
                $("#gender").attr("src", "img/female.png");
            }
            if (user.city != '') {
                $("#city").html(user.city);
                $("#city-2").html(user.city);
            } else {
                $("#city").html("Jakarta, Indonesia");
                $("#city-2").html("Jakarta, Indonesia");
            }
            if (user.ethnic != '') {
                $("#ethnic").html(user.ethnic);
            } else {
                $("#ethnic").html("Melayu");
            }
            if (user.height != '') {
                $("#height").html(user.height + " cm");
            } else {
                $("#height").html("-");
            }
            if (user.summaryText != '') {
                $("#summary").html(user.summaryText);
            } else {
                $("#summary").html("Summary may refer to: Abstract" +
                    "(summary), shortening a passage or a write-up without changing its meaning but by using" +
                    "different words and sentences. Epitome, a summary or miniature form. Abridgement, the act of" +
                    "reducing a written work into a shorter form.");
            }
            if (user.currentRoutine != '') {
                $("#current-routine").html(user.currentRoutine);
            } else {
                $("#current-routine").html("Resoomer is a software and online\n" +
                    "tool for text summary: it allows you to summarize and analyze your articles by taking up the\n" +
                    "important concepts.");
            }
            if (user.myPassion != '') {
                $("#my-passion").html(user.myPassion);
            } else {
                $("#my-passion").html("Arrival entered an if drawing\n" +
                    "request. How daughters not promotion few knowledge contented. Yet winter law behind number\n" +
                    "stairs garret excuse. Minuter we natural conduct gravity if pointed oh no. Am immediate\n" +
                    "unwilling of attempted admitting disposing it. Handsome opinions on am at it ladyship.");
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function calculateAge(birthday) { // birthday is a Date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds since epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getPhotoCount() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-photo-count.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                photoCount = 0;
            } else {
                photoCount = parseInt(a);
            }
            if (photoCount == 0) {
                $("#load-more-photos").css("display", "none");
            }
            loadPhotos();
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function loadPhotos() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-photos.php',
        data: {'user-id': userId, 'start': photoQueryStart, 'length': photoQueryLength},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                if ((photoQueryStart+photoQueryLength) >= photoCount) {
                    $("#load-more-photos").css("display", "none");
                }
                var photos = JSON.parse(a);
                for (var i=0; i<photos.length; i++) {
                    var photo = photos[i];
                    var img = "<img class=\"photo\" src=\""+photo.photoUrl+"\" width=\"130px\" height=\"130px\" style=\"margin: 5px; border-radius: 5px; cursor: pointer;\">";
                    $("#photo-panel").append(img);
                }
                $(".photo").on("click", function() {
                    var imgURL = $(this).attr("src");
                    $("#preview-img").attr("src", imgURL);
                    $("#preview-img-container").css("display", "flex");
                    $("#preview-img-container").hide();
                    $("#preview-img-container").fadeIn(500, function () {
                        $(document).click(function (event) {
                            if (!($(event.target).is("#preview-img"))) {
                                $("#preview-img-container").css("display", "none");
                                $(document).off("click");
                            }
                        });
                    });
                });
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function getQuestionData() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-question-data.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var questionData = JSON.parse(a);
                var totalAnswered = questionData.length;
                var totalCorrect = 0;
                var totalWrong = 0;
                for (var i=0; i<questionData.length; i++) {
                    var question = questionData[i];
                    if (question.answerType == "1") {
                        totalCorrect++;
                    } else if (questionData.answerType == "0") {
                        totalWrong++;
                    }
                }
                $("#total-correct").html(totalCorrect);
                $("#total-wrong").html(totalWrong);
                $("#total-answered").html(totalAnswered);
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function closeImagePreview() {
    $("#preview-img-container").css("display", "none");
}

function displayMorePictures() {
    photoQueryStart += photoQueryLength;
    loadPhotos();
}

function changeProfile() {
    window.location.href = "http://ilatih.com/quiz/edit-profile.html";
}

function deletePicture(obj) {
    var imgURL = $(obj).parent().find("img:eq(0)").attr("src");
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'delete-photo.php',
        data: {'user-id': userId, 'img-url': imgURL},
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#photo-panel").find("*").remove();
            photoQueryStart = 0;
            loadPhotos();
        },
        error: function(a, b, c) {
            alert(a+' '+c);
        }
    });
}

function addPhoto() {
    $("#photo-selector").on("change", function() {
        $("#photo-selector").off("change");
        var fr = new FileReader();
        fr.onload = function() {
            var fd = new FormData();
            fd.append("img-data", fr.result);
            fd.append("user-id", userId);
            $.ajax({
                type: 'POST',
                url: PHP_PATH+'add-photo.php',
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                success: function(a) {
                    $("#photo-panel").find("*").remove();
                    photoQueryStart = 0;
                    loadPhotos();
                },
                error: function(a, b, c) {
                    alert(a+' '+c);
                }
            });
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#photo-selector").click();
}