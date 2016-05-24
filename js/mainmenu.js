//true if a stage control has been expanded
var expanded = false;

//true if a button has been clicked
var haltAnimation = false; 

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
    //only allow novice & intermediate stages, difficulty level 1, for now
    if (difficulty == 0) {
        haltAnimation = true; 
        location.href = "game.html?s=" + stage + "&d=" + difficulty;             
    }
}

//shows the high scores popup
function showHighScores() {
     getHighScores();
	 $("#highscores").animate({bottom: '550px'}, 1000);  
}

//hides the high scores popup
function dismissHighScores() {
	 $("#highscores").animate({bottom: '-250px'}, 1000);
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