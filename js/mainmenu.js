//true if a stage control has been expanded
var expanded = false;

//true if a button has been clicked
var haltAnimation = false; 

//0 = not yet unlocked; 1 = unlocked;
var unlock1 = 0;
var unlock2 = 0;
var unlock3 = 0;

//Login.ID in the database
var userID = 0;

//the user's 3-letter name
var userName = "";

//0=piano, 1=harpsichord, 2=moog synth
var instrument = 0;

//0=standard theme, 1=unlockable theme
var theme = 0; 

//Expands novice stage to reveal two levels when clicked
$(document).ready(function () {
    $("#novice").click(function () {
        var div = $("#novice");

        if (!expanded) {
            div.animate({ height: '64%' }, "slow");
            $("#noviceword").animate({ top: '8.75%' });
            $("#novicenote").animate({ top: '6.25%' });
            $("#intermediate").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#novicecontent").slideToggle();           
            expanded = true;

        } else {
            if (!haltAnimation) { //don't shrink the control after the button has been clicked
                div.animate({ height: '15%' }, "slow");
                $("#noviceword").animate({ top: '37%' });
                $("#novicenote").animate({ top: '26%' });
                $("#intermediate").animate({ top: '22%' });
                $("#advanced").animate({ top: '64%' });
			    $("#novicecontent").slideToggle();
                expanded = false;                
            }
        }
    });
});

//Expands intermediate stage to reveal two levels when clicked
$(document).ready(function () {
    $("#intermediate").click(function () {
        var div = $("#intermediate");

        if (!expanded) {
            div.animate({ top: '-5%' }, "slow");
            div.animate({ height: '64%' }, "slow");
            $("#intermediateword").animate({ top: '10%' });
            $("#intermediatenote").animate({ top: '8%' });
            $("#novice").animate({ top: '100%' });
            $("#advanced").animate({ top: '100%' });
            $("#intermediatecontent").slideToggle();
            expanded = true;

        } else {
            if (!haltAnimation) { //don't shrink the control after the button has been clicked
                $("#intermediatecontent").slideToggle();
                div.animate({ height: '15%' }, "slow");
                div.animate({ top: '22%' }, "slow");            
                $("#intermediateword").animate({ top: '38.5%' });
                $("#intermediatenote").animate({ top: '30%' });
                $("#novice").animate({ top: '10%' });
                $("#advanced").animate({ top: '64%' });
                expanded = false;                
            }
        }
    });
});

//Expands advanced (staff) stage to reveal two levels when clicked
$(document).ready(function () {
    $("#advanced").click(function () {
        var div = $("#advanced");

        if (!expanded) {
            div.animate({ top: '10%' }, "slow");
            div.animate({ height: '64%' }, "slow");
            $("#advancedword").animate({ top: '10%' });
            $("#advancednote").animate({ top: '8%' });
            $("#intermediate").animate({ top: '100%' });
            $("#novice").animate({ top: '100%' });
            $("#advancedcontent").slideToggle();
            expanded = true;

        } else {
            if (!haltAnimation) { //don't shrink the control after the button has been clicked
                $("#advancedcontent").slideToggle();
                div.animate({ height: '15%' }, "slow");
                div.animate({ top: '64%' }, "slow");
                $("#advancedword").animate({ top: '38.5%' });
                $("#advancednote").animate({ top: '24%' });
                $("#intermediate").animate({ top: '22%' });
                $("#novice").animate({ top: '10%' });

                expanded = false;                
            }
        }
    });
});

//loads the game for the appropriate button click
function loadGame(stage, difficulty) {
	if (document.getElementById('style2').checked) {
		theme = 1;
	} else if (document.getElementById('style3').checked) {
		theme = 2;
	}
        haltAnimation = true; 
        location.href = "game.html?s=" + stage + "&d=" + difficulty;             
	if (stage == 3) {
        location.href = "game.html?s=3"; 
    }
}

//shows the high scores popup
function showHighScores() {
     getHighScores();
	 $("#highscores").animate({bottom: '20%'}, 1000);  
}

//hides the high scores popup
function dismissHighScores() {
	 $("#highscores").animate({bottom: '-85.5%'}, 1000);
}

//loads the high scores from the database
function getHighScores() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            var scores = result.split("{");
            for (x = 0; x < 5; x++) {
                var scoreValues = scores[x].split("}");
                document.getElementById("hsname" + (x + 1)).innerHTML = scoreValues[0].toUpperCase();
                document.getElementById("hsscore" + (x + 1)).innerHTML = scoreValues[1];
            }
        }
    };

    xmlhttp.open("GET", "../php/gethighscores.php", true);
    xmlhttp.send();
}

//goes back to the landing page
function goBack() {
    location.href = "index.html";    
}

//apply the user's name 
function applyUser() {
    var logged = document.getElementById("loggedin");
    if (userName == "") {
        logged.innerHTML = ""; 
    } else {
        logged.innerHTML = "<div> Hi, " + userName.toUpperCase() + "</div>"; 
    }
}

//checks if the free mode button should be available
function getUnlockables() {


        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = xmlhttp.responseText;
                var values = result.split("{");
                if (values[0] > 0) { //first value equals 0 if there is no user logged on
                    userID = parseInt(values[0]);
                    userName = values[1];
                    theme = parseInt(values[2]);
                    instrument = parseInt(values[3]);
                    unlock1 = parseInt(values[4]);
                    unlock2 = parseInt(values[5]);
                    unlock3 = parseInt(values[6]);

                }
                
                setUnlockables(); 
            }
        };

        xmlhttp.open("GET", "./php/getlogin.php", true);
        xmlhttp.send();    

    
}

//sets whether the unlockables should be available or not
function setUnlockables() {
    //free mode
    var button = document.getElementById("freemodebutton");
    button.innerHTML = "Locked";
    button.style.color = "silver";
    if (unlock1 > 0) {
        button.innerHTML = "Free Mode";
        button.style.color = "#00ffff";
        button.addEventListener("click", function () {
            loadGame(3, 0)
        }, true);
    }

    //keyboard sounds
    if (unlock2 > 0) {
        document.getElementById("sound1").disabled = false;
        document.getElementById("sound2").disabled = false;
        document.getElementById("sound3").disabled = false;
        document.getElementById("sound" + (instrument + 1)).checked = true; 

        document.getElementById("soundlabel1").style.color = "white";
        document.getElementById("soundlabel2").style.color = "white";
        document.getElementById("soundlabel3").style.color = "white";
    } else {
        document.getElementById("sound1").checked = true;
        document.getElementById("sound1").disabled = true;
        document.getElementById("sound2").disabled = true;
        document.getElementById("sound3").disabled = true;

        document.getElementById("soundlabel1").style.color = "silver";
        document.getElementById("soundlabel2").style.color = "silver";
        document.getElementById("soundlabel3").style.color = "silver";
    }
    
    //keyboard style
    if (unlock3 > 0) {
        document.getElementById("style1").disabled = false;
        document.getElementById("style2").disabled = false;
        document.getElementById("style3").disabled = false;
        document.getElementById("style" + (theme + 1)).checked = true; 

        
        document.getElementById("stylelabel1").style.color = "white";
        document.getElementById("stylelabel2").style.color = "white";
        document.getElementById("stylelabel3").style.color = "white";
    } else {
        document.getElementById("style1").checked = true;
        document.getElementById("style1").disabled = true;
        document.getElementById("style2").disabled = true;
        document.getElementById("style3").disabled = true;

        document.getElementById("stylelabel1").style.color = "silver";
        document.getElementById("stylelabel2").style.color = "silver";
        document.getElementById("stylelabel3").style.color = "silver";
    }
    
    applyUser();

}

function register() {

    var email = document.getElementById("enterregisteremail").value;
    var password = document.getElementById("enterregisterpassword").value;
    var name = document.getElementById("enterregisternickname").value;


    if (email != "" && password != "" && validateEmail(email)) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = xmlhttp.responseText
                var values = result.split("{");
                if (values[0] == "INVALID") {
                    document.getElementById("registerresponse").innerHTML = "Email already exists.";
                } else {
                    document.getElementById("registerresponse").innerHTML = "Registration complete.";
                }
            }
        };

        xmlhttp.open("GET", "php/signup.php?Email=" + email + "&Password=" + password + "&Name=" + name, true);
        xmlhttp.send();
    } else {
        document.getElementById("registerresponse").innerHTML = "Invalid email or name.";        
    }
}

function login() {
    var email = document.getElementById("enterloginemail").value;
    var password = document.getElementById("enterloginpassword").value;

    if (email != "" && password != "" && validateEmail(email)) {
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = xmlhttp.responseText;
                var values = result.split("{");
                if (parseInt(values[0]) == 0) {
                    document.getElementById("loginresponse").innerHTML = "Invalid login.";
                } else {
                    document.getElementById("loginresponse").innerHTML = "Login successful.";

                    getUnlockables();
                }
            }
        };
        
        xmlhttp.open("GET", "php/login.php?Email=" + email + "&Password=" + password, true);
        xmlhttp.send();
    } else {
        document.getElementById("loginresponse").innerHTML = "Invalid login.";
    } 
    
}

//checks the email is only valid characters
function validateEmail(email) {
    return !(/[^a-zA-Z0-9@.]/.test(email));
}


//checks that high score name is only valid characters
function validateName(name) {
    return /[A-Za-z]{3}/.test(name); 
}

//updates the user's selected settings
function updateSettings() {
    //set theme and instrument based on radio buttons
    for (x = 1; x <= 3; x++) {
        if (document.getElementById("style" + x).checked) {
            theme = x - 1;
        }
        if (document.getElementById("sound" + x).checked) {
            instrument = x - 1;
        }
    }

    //update database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // hide settings menu
            var slideoutMenu = $('.slideout-menu');
            var slideoutMenuWidth = $('.slideout-menu').width();
            slideoutMenu.toggleClass("open");
            if (slideoutMenu.hasClass("open")) {
                slideoutMenu.animate({
                    right: "0px"
                });
            } else {
                slideoutMenu.animate({
                    right: -slideoutMenuWidth
                }, 250);
            }
        }
    };

    xmlhttp.open("GET", "php/updatesettings.php?Theme=" + theme + "&Sound=" + instrument, true);
    xmlhttp.send();
}