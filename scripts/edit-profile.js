var userId = "";
var imageData = "";

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
    imageData = "";
    $("#profile-picture-container").on({
        mouseenter: function() {
            $("#profile-picture-edit-container").css("display", "flex");
            $("#profile-picture-edit-container").hide();
            $("#profile-picture-edit-container").fadeIn(150);
        },
        mouseleave: function() {
            $("#profile-picture-edit-container").fadeOut(150);
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
            loadUserProfile();
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

function loadUserProfile() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-user-by-id.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var user = JSON.parse(a);
            var name = user.name;
            var profilePictureURL = user.profilePictureURL;
            if (profilePictureURL != '') {
                imageData = "noupdate";
                $("#profile-picture").attr("src", profilePictureURL);
            }
            var birthdayMillis = user.birthday;
            var gender = user.gender;
            var city = user.city;
            var ethnic = user.ethnic;
            var height = user.height;
            $("#summary").val(user.summaryText);
            $("#current-routine").val(user.currentRoutine);
            $("#my-passion").val(user.myPassion);
            $("#name").val(name);
            if (birthdayMillis != '') {
                var birthday = new Date(parseInt(birthdayMillis));
                var day = birthday.getDate();
                if (day < 10) {
                    day = "0"+day;
                }
                var month = birthday.getMonth()+1;
                if (month < 10) {
                    month = "0"+month;
                }
                var year = birthday.getFullYear();
                $("#birthday").val(""+day+"/"+month+"/"+year);
            }
            $("#gender").val(gender);
            $("#city").val(city);
            $("#ethnic").val(ethnic);
            $("#height").val(height);
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function changeProfilePicture() {
    $("#select-profile-picture").on("change", function() {
        $("#select-profile-picture").off("change");
        var fr = new FileReader();
        fr.onload = function() {
            imageData = fr.result;
            $("#profile-picture").attr("src", imageData);
        };
        fr.readAsDataURL($(this).prop("files")[0]);
    });
    $("#select-profile-picture").click();
}

function saveProfileInfo() {
    var fd = new FormData();
    fd.append("user-id", userId);
    fd.append("name", $("#name").val());
    try {
        var birthday = $("#birthday").val();
        var day = parseInt(birthday.split("/")[0]);
        var month = parseInt(birthday.split("/")[1])-1;
        var year = parseInt(birthday.split("/")[2]);
        var date = new Date(year, month, day);
        var birthdayMillis = date.getTime();
        fd.append("birthday", birthdayMillis);
    } catch (err) {
    }
    var imgFileName = guid()+".png";
    if (imageData != '' && imageData != 'noupdate') {
        var fd2 = new FormData();
        fd2.append("img-file-name", imgFileName);
        fd2.append("img-data", imageData);
        $.ajax({
            type: 'POST',
            url: PHP_PATH+'upload-img.php',
            data: fd2,
            processData: false,
            contentType: false,
            cache: false,
            success: function(a) {
            },
            error: function(a, b, c) {
                alert(a+' '+c);
            }
        });
    }
    fd.append("gender", $("#gender").val());
    fd.append("city", $("#city").val());
    fd.append("ethnic", $("#ethnic").val());
    fd.append("height", $("#height").val());
    fd.append("summary", $("#summary").val());
    fd.append("current-routine", $("#current-routine").val());
    fd.append("my-passion", $("#my-passion").val());
    if (imageData == 'noupdate') {
        fd.append("img-path", "noupdate");
    } else {
        fd.append("img-path", "http://ilatih.com/backend/userdata/imgs/" + imgFileName);
    }
    $.ajax({
        type: 'POST',
        url: PHP_PATH+'update-user.php',
        data: fd,
        processData: false,
        contentType: false,
        success: function(a) {
            window.location.href = "http://ilatih.com/ujicoba/profile.html";
        },
        error: function(a, b, c) {
            alert(b+' '+c);
        }
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function cancelEditing() {
    window.location.href = document.referrer;
}