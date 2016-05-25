//default height and width of screen
var maxHeight = 670;
var maxWidth = 1027;

//true if a stage control has been expanded
var expanded = false;

//true if a button has been clicked
var haltAnimation = false; 

/*resizeMap();

function resizeMap() {
    var img = document.getElementById("transparent");   
    var sizeRatio = img.clientHeight / maxHeight;
   
   imageMapResize();

	document.getElementById("popup").style.width = Math.round(maxWidth * sizeRatio) + "px";
	
	document.getElementById("highscores").style.left = Math.round(img.clientWidth * 0.225) + "px";
	document.getElementById("highscores").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("highscores").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("highscores").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("hsheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("scores").style.fontSize = Math.round(highScoreFontSize * sizeRatio) + "px";
	document.getElementById("hsconfirmbutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("login").style.left = Math.round(img.clientWidth * 0.225) + "px";
	document.getElementById("login").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("login").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("login").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("lheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("loginemail").style.fontSize = Math.round(loginFontSize * sizeRatio) + "px";
	document.getElementById("loginpassword").style.fontSize = Math.round(loginFontSize * sizeRatio) + "px";
	document.getElementById("lbutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("register").style.left = Math.round(img.clientWidth * 0.225) + "px";
	document.getElementById("register").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("register").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("register").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("rheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("registeremail").style.fontSize = Math.round(registerFontSize * sizeRatio) + "px";
	document.getElementById("registerpassword").style.fontSize = Math.round(registerFontSize * sizeRatio) + "px";
	document.getElementById("registernickname").style.fontSize = Math.round(registerFontSize * sizeRatio) + "px";
	document.getElementById("rbutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("settings").style.left = Math.round(img.clientWidth * 0.225) + "px";
	document.getElementById("settings").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("settings").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("settings").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("sheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("sbutton1").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	document.getElementById("sbutton2").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
}*/

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
        haltAnimation = true; 
        location.href = "game.html?s=" + stage + "&d=" + difficulty;             
	if (stage == 3) {
        location.href = "game.html?s=3"; 
    }
}

//shows the high scores popup
function showHighScores() {
     getHighScores();
	 $("#highscores").animate({bottom: '120%'}, 1000);  
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
                document.getElementById("hsname" + (x + 1)).innerHTML = scoreValues[0];
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