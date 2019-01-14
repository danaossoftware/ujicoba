const CORRECT_ANSWER_SCORE = 10;
const WRONG_ANSWER_SCORE = -5;

var courseId = 0;
var chapterId = 0;
var currentQuestion = 0;
var totalQuestions = 0;
var scores = [];
var answerTypes = []; //Correct = 1, Wrong = 0
var userAnswers = [];
var questionIds = [];
var wrongAnswerPositions = []; //0 = first answer, 1 = second answer, 2 = third answer
/* FORMAT */
/* Setiap value pada 'wrongAnswerPositions' terdiri dari string. Setiap string terdiri dari index-index dari jawaban yang salah, dan dibatasi dengan '@'. Sebagai contoh,
jawaban salah untuk soal 1 adalah pada posisi 0 dan 1, dan
jawaban salah untuk soal 2 adalah pada posisi 2. Maka array-nya akan terlihat seperti ini:
[0] => "0@1"
[1] => "2"
 */
var totalCorrectAnswers = 0;
var totalWrongAnswers = 0;
var questions;

$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    courseId = params.split("&")[0].split("=")[1];
    chapterId = params.split("&")[1].split("=")[1];
    $("#home").on("click", function () {
        window.location.href = "http://ilatih.com/quiz/home.html?page=0";
    });
    $("#latihan").on("click", function () {
        window.location.href = "http://ilatih.com/quiz/home.html?page=1";
    });
    currentQuestion = window.localStorage.getItem("current-question");
    currentQuestion = 0;
    loadQuestions();
    setItemCheckBoxListener();
});

function loadQuestions() {
    scores = [];
    userAnswers = [];
    questionIds = [];
    answerTypes = [];
    wrongAnswerPositions = [];
    totalCorrectAnswers = 0;
    totalWrongAnswers = 0;
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get-random-questions.php',
        data: {'course_id': courseId, 'chapter_id': chapterId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                questions = JSON.parse(a);
                totalQuestions = questions.length;
                loadQuestion(currentQuestion);
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function loadQuestion(index) {
    $("#question-img-container").css("display", "none");
    $("#current-question").html("Soal " + (+index + 1) + " dari " + totalQuestions);
    var question = questions[index];
    var answers = question.answers;
    var answerA = answers.split("@")[0];
    var answerB = answers.split("@")[1];
    var answerC = answers.split("@")[2];
    var answerD = answers.split("@")[3];
    if (question.type == "pilihan") {
        var items = "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px;\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerA + "</div></div>";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerB + "</div></div>";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px;\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerC + "</div></div>";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px;\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerD + "</div></div>";
        $("#answers").html(items);
    } else if (question.type == "isian") {
        var items = "";
        for (var i = 0; i < answers.split("@").length; i++) {
            items += "<div style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: black;\">Jawaban " + (i + 1) + ":</div>\n" +
                "<input class=\"input1\" style=\"margin-top: 5px;\" type=\"text\" name=\"answer-" + (i + 1) + "\" id=\"answer-" + (i + 1) + "\">";
        }
        /*var isChrome = !!window.chrome && !!window.chrome.webstore;
        if (isChrome) {
            items += "<div style=\"margin-top: 10px; width: 100%; display: flex; justify-content: center; align-items: center;\">\n" +
                "<button id=\"answer-with-voice\" class=\"flat-button\">Jawab Dengan Suara</button>\n" +
                "</div>";
        }*/
        $("#answers").html(items);
    }
    if (question.video_url != '') {
        $("#question-video-source").attr("src", question.video_url);
        $("#question-video")[0].load();
        $("#question-video").css("display", "block");
    }
    if (question.audio_url != '') {
        $("#question-audio-source").attr("src", question.audio_url);
        $("#question-audio")[0].load();
        $("#question-audio-container").css("display", "flex");
    }
    if (question.picture_url != '') {
        $("#question-img").attr("src", question.picture_url);
        $("#preview-img").attr("src", question.picture_url);
        $("#question-img-container").css("display", "flex");
        $("#question-img").on("click", function () {
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
    $("#question").html(question.question);
    setItemCheckBoxListener();
    setListeners();
}

function setListeners() {
    $("#answer-with-voice").on("click", function () {
        var recognizer = new window.webkitSpeechRecognition();
        recognizer.onresult = function (e) {
            var text = e.results[0][0].transcript;
        };
        recognizer.start();
    });
}

function setItemCheckBoxListener() {
    $("#question-panel").find("*").each(function () {
        if ($(this).attr("class") === "check-img") {
            $(this).on('click', function () {
                // Uncheck all checkboxes
                $("#answers").find("*").each(function () {
                    if ($(this).prop("tagName") == "LABEL") {
                        $(this).find("input").prop("checked", false);
                        $(this).find(".check-img").css("opacity", "0");
                    }
                });
                var checkBox = $(this).parent().find("input");
                var checkBoxImg = $(this);
                checkBoxImg.css("opacity", "1");
                checkBox.prop("checked", true);
                var checked = false;
                event.preventDefault();
            });
        }
    });
}

function toNextQuestion() {
    var questionType = questions[currentQuestion].type;
    if (questionType == "pilihan") {
        // Check if no checkbox is checked
        var totalChecked = 0;
        var answer = -1;
        var i = 0;
        $("#answers").find("*").each(function () {
            if ($(this).attr("class") == "check-img") {
                var checkBox = $(this).parent().find("input");
                var checked = checkBox.prop("checked");
                if (checked) {
                    totalChecked++;
                    answer = i;
                }
                i++;
            }
        });
        if (totalChecked == 0) {
            $("#prompt-title").html("Peringatan");
            $("#prompt-text").html("Mohon centang salah satu pilihan");
            $("#prompt-no").css("display", "none");
            $("#prompt-yes").html("OK");
            $("#prompt").css("display", "flex");
            $("#prompt-yes").on("click", function () {
                $("#prompt").css("display", "none");
            });
            $("#prompt-no").on("click", function () {
            });
            return;
        }
        var realAnswer = parseInt(questions[currentQuestion].correct_answer);
        var score = 0;
        if (answer == realAnswer) {
            score = CORRECT_ANSWER_SCORE;
            answerTypes.push(1);
        } else {
            score = WRONG_ANSWER_SCORE;
            answerTypes.push(0);
        }
        questionIds.push(questions[currentQuestion].id);
        scores.push(score);
        wrongAnswerPositions.push("");
        userAnswers.push("" + answer);
    } else if (questionType == "isian") {
        var answers = questions[currentQuestion].answers;
        var splittedAnswers = answers.split("@");
        var score = 0;
        var allCorrect = true;
        var wrongPositions = "";
        for (var i = 0; i < splittedAnswers.length; i++) {
            var realAnswer = splittedAnswers[i];
            var answer = $("#answer-" + (i + 1)).val();
            if (answer == '') {
                $("#prompt-title").html("Peringatan");
                $("#prompt-text").html("Mohon isi semua jawaban sebelum melanjutkan");
                $("#prompt-yes").html("OK");
                $("#prompt-no").css("display", "none");
                $("#prompt").css("display", "flex");
                $("#prompt-yes").on("click", function () {
                    $("#prompt").css("display", "none");
                });
                return;
            }
            if (answer != realAnswer) {
                allCorrect = false;
                wrongPositions += ("" + i + "@");
            }
        }
        wrongPositions = wrongPositions.substr(0, wrongPositions.length - 1);
        wrongAnswerPositions.push(wrongPositions);
        if (allCorrect) {
            score = CORRECT_ANSWER_SCORE;
            answerTypes.push(1);
        } else {
            score += CORRECT_ANSWER_SCORE;
            score = WRONG_ANSWER_SCORE;
            answerTypes.push(0);
        }
        questionIds.push(questions[currentQuestion].id);
        scores.push(score);
        var answer1 = $("#answer-1").val();
        var answer2 = $("#answer-2").val();
        var answer3 = $("#answer-3").val();
        userAnswers.push(answer1 + "@" + answer2 + "@" + answer3);
    }
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        $("#current-question").html("Soal " + (currentQuestion + 1) + " dari " + totalQuestions);
        $("#answers").find("*").each(function () {
            if ($(this).prop("tagName") == "LABEL") {
                $(this).find("input").prop("checked", false);
                $(this).find(".check-img").css("opacity", "0");
            }
        });
        if (currentQuestion == totalQuestions - 1) {
            $("#next-question").html("Selesai");
        }
        $("#fader").fadeIn(200, function () {
            loadQuestion(currentQuestion);
            $("#fader").fadeOut(200);
        });
        window.localStorage.setItem("current-question", currentQuestion);
    } else {
        $("#prompt-title").html("Konfirmasi");
        $("#prompt-text").html("Apakah Anda yakin ingin menyelesaikan latihan ini?");
        $("#prompt-yes").html("Ya");
        $("#prompt-no").html("Tidak");
        $("#prompt-no").css("display", "flex");
        $("#prompt").css("display", "flex");
        $("#prompt-yes").on("click", function () {
            $("#prompt-yes").off("click");
            $.ajax({
                type: 'GET',
                url: PHP_PATH + 'get-session.php',
                dataType: 'text',
                cache: false,
                success: function (a) {
                    var session = JSON.parse(a);
                    var userId = session.userId;
                    $.ajax({
                        type: 'POST',
                        url: PHP_PATH + 'add-question-data.php',
                        dataType: 'text',
                        data: {
                            'user-id': userId,
                            'question-ids': questionIds,
                            'answer-types': answerTypes,
                            'scores': scores,
                            'answers': userAnswers,
                            'wrong-answer-positions': wrongAnswerPositions
                        },
                        cache: false,
                        success: function (a) {
                            window.location.href = "http://ilatih.com/quiz/score.html";
                        },
                        error: function (a, b, c) {
                            alert(b + ' ' + c);
                        }
                    });
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        });
        $("#prompt-no").on("click", function () {
            $("#prompt").css("display", "none");
        });
    }
}
