var score = 0;
var questions;
var currentQuestion = 0;
var totalCorrect = 0;
var totalWrong = 0;
var alphabets = ["A", "B", "C", "D"];
var firstQuestionAdded = false;

$(document).ready(function () {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/ujicoba/browsernotsupported.html";
        return;
    }*/
    firstQuestionAdded = false;
    $("#wrong-answers").find("*").remove();
    var params = location.search;
    if (params != '') {
        params = params.substr(1, params.length);
        var userId = params.split("&")[0].split("=")[1];
        loadScore(userId);
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var session = JSON.parse(a);
                var userId = session.userId;
                loadScore(userId);
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
});

function loadScore(userId) {
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get-question-data.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            questions = JSON.parse(a);
            score = 0;
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                score += parseInt(question.score);
                if (question.answerType == 1) {
                    totalCorrect++;
                } else if (question.answerType == 0) {
                    totalWrong++;
                    if (!firstQuestionAdded) {
                        firstQuestionAdded = true;
                        addQuestion(i);
                    }
                }
            }
            $("#answered-questions").html(questions.length);
            $("#correct-answers-count").html(totalCorrect);
            $("#wrong-answers-count").html(totalWrong);
            updateScore(0);
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function addQuestion(index) {
    if (index >= questions.length) {
        return;
    }
    var questionData = questions[index];
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-question-by-id.php',
        dataType: 'text',
        data: {'id': questionData.questionId},
        cache: false,
        success: function(a) {
            var question = JSON.parse(a);
            var items = "";
            if (question.type == "pilihan") {
                items = "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 30px; color: #2270f3; margin-top: 20px;\">\n" +
                    "Soal nomor " + (index + 1) + "\n" +
                    "</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; color: black;\">\n" +
                    question.question + "\n" +
                    "</div>\n" +
                    "<div style=\"margin-top: 15px; border-radius: 10px; border: 1px solid #c08175; background-color: rgba(254, 108, 93, 0.4); padding: 20px;\">\n" +
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Jawaban Anda:</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+alphabets[parseInt(questionData.answers)]+"</div>\n" +
                    "</div>\n" +
                    "<div style=\"margin-top: 15px; border-radius: 10px; border: 1px solid darkgreen; background-color: lightgreen; padding: 20px;\">\n" +
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Jawaban yang Benar:</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+alphabets[parseInt(question.correct_answer)]+"</div>\n" +
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Alasan:</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+question.reason+"</div>\n" +
                    "</div>";
            } else if (question.type == "isian") {
                var splittedAnswers = questionData.answers.split("@");
                items = "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 30px; color: #2270f3; margin-top: 20px;\">\n" +
                    "Soal nomor " + (index + 1) + "\n" +
                    "</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; color: black;\">\n" +
                    question.question + "\n" +
                    "</div>\n" +
                    "<div style=\"margin-top: 15px; border-radius: 10px; border: 1px solid #c08175; background-color: rgba(254, 108, 93, 0.4); padding: 20px;\">\n" +
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Jawaban Anda:</div>\n" +
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 1 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+splittedAnswers[0]+"</span><br/>\n"+
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 2 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+splittedAnswers[1]+"</span><br/>\n"+
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 3 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+splittedAnswers[2]+"</span><br/>\n"+
                    "</div>\n" +
                    "<div style=\"margin-top: 15px; border-radius: 10px; border: 1px solid darkgreen; background-color: lightgreen; padding: 20px;\">\n" +
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Jawaban yang Benar:</div>\n" +
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 1 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+question.answers.split("@")[0]+"</span><br/>\n"+
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 2 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+question.answers.split("@")[1]+"</span><br/>\n"+
                    "<span style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: #222222;\">Jawaban 3 :</span> "+
                    "<span style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+question.answers.split("@")[2]+"</span><br/>\n"+
                    "<div style=\"color: #222222; font-family: 'PalanquinBold', Arial; font-size: 18px;\">Alasan:</div>\n" +
                    "<div style=\"font-family: 'SegoeUILight', Arial; font-size: 15px; color: #222222;\">"+question.reason+"</div>\n" +
                    "</div>";
            }
            $("#wrong-answers").append(items);
            $.ajax({
                type: 'GET',
                url: PHP_PATH + 'get-question-by-id.php',
                data: {'id': questionData.questionId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    index++;
                    addQuestion(index);
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function updateScore(index) {
    if (score < 0) {
        $("#score").html(score);
        $("#congratulations").html("Jangan bersedih");
        endScoreAnimation();
        return;
    }
    if (index > score) {
        index = score;
    }
    $("#score").html(index);
    var percentage = index * 100 / score;
    var percentage2 = totalCorrect * 100 / questions.length;
    if (percentage >= 100) {
        var backgroundColor;
        if (percentage2 >= 75) {
            backgroundColor = "#2ecc71"
        } else {
            backgroundColor = "#d35400"
        }
        document.getElementById("progress").style.width = "300px";
        document.getElementById("progress").style.backgroundColor = backgroundColor;
    } else if (percentage >= 75) {
        var backgroundColor;
        if (percentage2 >= 75) {
            backgroundColor = "#f1c40f"
        } else {
            backgroundColor = "#d35400"
        }
        document.getElementById("progress").style.width = "240px";
        document.getElementById("progress").style.backgroundColor = backgroundColor;
    } else if (percentage >= 50) {
        var backgroundColor;
        if (percentage2 >= 75) {
            backgroundColor = "#f39c12"
        } else {
            backgroundColor = "#d35400"
        }
        document.getElementById("progress").style.width = "120px";
        document.getElementById("progress").style.backgroundColor = backgroundColor;
    } else if (percentage >= 25) {
        document.getElementById("progress").style.width = "60px";
        document.getElementById("progress").style.backgroundColor = "#d35400";
    }
    if (index < score) {
        setTimeout(function () {
            index += 10;
            updateScore(index);
        }, 100);
    } else {
        if (percentage2 > 25 && percentage2 <= 50) {
            $("#congratulations").html("Perlu ditingkatkan lagi");
        } else if (percentage2 > 50 && percentage2 <= 75) {
            $("#congratulations").html("Hasil Anda memuaskan");
        } else if (percentage2 > 75) {
            $("#congratulations").html("Selamat, hasil Anda memuaskan");
        } else {
            $("#congratulations").html("Jangan bersedih");
        }
        endScoreAnimation();
    }
}

function endScoreAnimation() {
    setTimeout(function () {
        $("#score-container").css("display", "none");
        /*document.getElementById("score-container").style.transform = "translate(0, -70px)";
        //document.getElementById("score-details-container").style.transform = "translate(0, -90px)";
        document.getElementById("details-container").style.transform = "translate(0, -20px)";
        $("#score").animate({
            fontSize: "80px"
        }, 500);
        $("#score-title").animate({
            fontSize: "30px"
        }, 500);
        $("#congratulations").animate({
            fontSize: "30px"
        }, 500);
        $("#progress").animate({
            opacity: "0"
        }, 500);*/
        $("#score-details-container").css("display", "flex");
        $("#score-details-container").hide();
        $("#score-details-container").fadeIn(500);
        if (totalWrong > 0) {
            $("#details-container").css("display", "flex");
            $("#details-container").hide();
            $("#details-container").fadeIn(500);
        }
        $("#btn-container").css("display", "flex");
        $("#btn-container").hide();
        $("#btn-container").fadeIn(500);
        $("#share-buttons").css("display", "flex");
        $("#share-buttons").hide();
        $("#share-buttons").fadeIn(500);
        $("#share-buttons").css("marginTop", "10px");
        $("#share-buttons-title").css("display", "flex");
        $("#share-buttons-title").hide();
        $("#share-buttons-title").fadeIn(500);
        $("#share-facebook").on("click", function() {
            share("facebook");
        });
        $("#share-twitter").on("click", function() {
            share("twitter");
        });
        $("#share-google-plus").on("click", function() {
            share("google-plus");
        });
        $(".main-container").css("paddingBottom", "20px");
    }, 500);
}

function backToHomePage() {
    window.location.href = "http://ilatih.com/ujicoba/home-mobile.html";
}

function share(method) {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var userId = JSON.parse(a).userId;
            var url = encodeURI("http://ilatih.com/ujicoba/score.html?user_id="+userId);
            if (method == 'facebook') {
                window.location.href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
            } else if (method == 'twitter') {
                window.location.href = "https://twitter.com/share?url="+url;
            } else if (method == 'google-plus') {
                window.open("https://plus.google.com/share?url=//ilatih.com/quiz/score.html?user_id="+userId, "_blank").focus();
            }
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}