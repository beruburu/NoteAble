//***SCREEN RESIZING***

//default height and width of keyboard image
var maxHeight = 670;
var maxWidth = 1027;

//default location and size of musical staff
var staffTop = 81;
var staffHeight = 143;

//default height of lives list
var livesHeight = 50; 

//default font size for the highscore
var scoreFontSize = 30;

//default font size for the timer
var timerFontSize = 40;

//default size for menu buttons
var menuButtonSize = 80;

//default font size for popup headings
var popupHeadingFontSize = 42;

//default font sizes for game over content
var scoreHeadingFontSize = 35;
var scoreGOFontSize = 46;
var bestScoreFontSize = 20;

//default font size for instruction content
var instructionFontSize = 35;

//default font sizes for enter high score content
var enterHighScoreFontSize = 30;
var intialsFontSize = 66;

//default font size for high score content
var highScoreFontSize = 30;

//default button font size
var buttonFontSize = 29;

//default coordinates of image map
var coords = [[3, 252, 109, 252, 109, 494, 143, 494, 143, 662, 3, 662]
, [112, 254, 183, 491]
, [151,494,185,494,185,253,255,253,255,494,292,494,292,659,151,659]
, [256,254,329,491]
, [299,494,330,494,330,254,439,254,439,662,299,662]
, [444,254,550,254,550,494,593,494,581,661,444,660]
, [551,253,622,492]
, [589,663,590,494,624,493,625,254,695,253,696,491,726,495,728,662]
, [698,253,767,492]
, [735,494,769,494,770,254,841,255,841,491,875,496,875,662,735,662]
, [840,253,912,492]
, [882,44,914,494,914,254,1020,254,1020,659,882,659]
]; 


//***TIMEOUT DELAYS***

//delay before resetting a pressed key
var delay = 600;

//delay before hiding the computer's staff
var staffDelay = 1000;

//***KEY VALUES***

//enter sound values into array
var keySounds = [];
keySounds[0] = new Audio();
keySounds[0].src = "sounds/c.mp3";
keySounds[1] = new Audio();
keySounds[1].src = "sounds/cSharp.mp3";
keySounds[2] = new Audio();
keySounds[2].src = "sounds/d.mp3";
keySounds[3] = new Audio();
keySounds[3].src = "sounds/dSharp.mp3";
keySounds[4] = new Audio();
keySounds[4].src = "sounds/e.mp3";
keySounds[5] = new Audio();
keySounds[5].src = "sounds/f.mp3";
keySounds[6] = new Audio();
keySounds[6].src = "sounds/fSharp.mp3";
keySounds[7] = new Audio();
keySounds[7].src = "sounds/g.mp3";
keySounds[8] = new Audio();
keySounds[8].src = "sounds/gSharp.mp3";
keySounds[9] = new Audio();
keySounds[9].src = "sounds/a.mp3";
keySounds[10] = new Audio();
keySounds[10].src = "sounds/aSharp.mp3";
keySounds[11] = new Audio();
keySounds[11].src = "sounds/b.mp3";

//names of all keys
var keys = ["c", "cSharp", "d", "dSharp", "e", "f", "fSharp", "g", "gSharp", "a", "aSharp", "b"];


//***USER INPUT***

//arrays of keys pressed
var keysPressed = [];

//the maximum length of the user sequence
var keysMax = 9;

//true if the user's input matches the track
var correct = false;

//the number of times the user has won
var winCount = 0;

//the number of times the user has lost
var lossCount = 0; 

//sound plays when user wins
var winSound = new Audio('sounds/win.wav');

//sound plays when user loses
var loseSound = new Audio('sounds/lose.wav');

//**COMPUTER GENERATED TRACK**

//the current position when playing through the track
var i = 0;

//array of notes for the random track
var track = [];

//**EASTER EGG

//array of notes to activate the easter egg
var easterEggSeq = [4, 2, 0, 2, 4, 4, 4];

//true if easter egg is currently running
var easterEggRunning = false; 


//enter easter egg sheep sound values into array
var eeSounds = [];
eeSounds[0] = new Audio();
eeSounds[0].src = "sounds/sheep/c.wav";
eeSounds[1] = new Audio();
eeSounds[1].src = "sounds/sheep/cSharp.wav";
eeSounds[2] = new Audio();
eeSounds[2].src = "sounds/sheep/d.wav";
eeSounds[3] = new Audio();
eeSounds[3].src = "sounds/sheep/dSharp.wav";
eeSounds[4] = new Audio();
eeSounds[4].src = "sounds/sheep/e.wav";
eeSounds[5] = new Audio();
eeSounds[5].src = "sounds/sheep/f.wav";
eeSounds[6] = new Audio();
eeSounds[6].src = "sounds/sheep/fSharp.wav";
eeSounds[7] = new Audio();
eeSounds[7].src = "sounds/sheep/g.wav";
eeSounds[8] = new Audio();
eeSounds[8].src = "sounds/sheep/gSharp.wav";
eeSounds[9] = new Audio();
eeSounds[9].src = "sounds/sheep/a.wav";
eeSounds[10] = new Audio();
eeSounds[10].src = "sounds/sheep/aSharp.wav";
eeSounds[11] = new Audio();
eeSounds[11].src = "sounds/sheep/b.wav";

//true for one sequence after easter egg
var useEESounds = false; 

//**OTHER VARIABLES**

//true if the keyboard is disabled
var disabled = false;

//true if this sequence has already been won or lost
var sequenceComplete = false;

//true if the game is paused
var paused = false;

//true if createTrack should be resumed after unpausing
var resumeTrack = false; 

//**DIFFICULTY LEVEL**

//the length of the track
var trackLength = 3;

//the number of wins before an increase in length 
var winsPerLength = 3; 

//the number of wins that have happened at this length
var winsPerLengthCount = 0; 

//**STAGE & LEVEL**

//0=Shapes, 1=Letters, 2=Staff
var stage = 0;

//difficulty -- not yet implemented
var difficulty = 0;

//**TIMER**/

//the timer itself
var timer = document.getElementById('timer');

//the number of seconds on the timer
var seconds = 0;

//the delay between timer ticks
var waitDelay = 1000;

//true if the timer is paused
var timerPaused = false; 

 //timer for start countdown 
var countdownTimer = null;

//image number for countdown graphic
var countdownImageNumber = 1;

//**PAGE LOADING SEQUENCE**
loadPage();
instructAppear();

//sets up the page
function loadPage() {
    //add event listeners for dynamic image map 
    window.addEventListener('resize', resizeWindow);
    document.getElementById("keyboard").addEventListener('load', resizeMap);

    //read stage and difficulty from query string
    var url = window.location.href;
    if (url.includes("s=")) {
        stage = parseInt(url.charAt(url.indexOf("s=") + 2));
    }
    if (url.includes("d=")) {
        difficulty = parseInt(url.charAt(url.indexOf("d=") + 2));
    }

    switch (stage) {
        case 0:
            document.getElementById("keyboard").src = "images/NoteAble_Keyboard_shapes.png";
            break;
        case 1:
            document.getElementById("keyboard").src = "images/NoteAble_Keyboard_letters.png";
            break;
        case 2:
            document.getElementById("keyboard").src = "images/NoteAble_Keyboard_staff.png";
    }
}


//fires when the window is resized
function resizeWindow() {
    setTimeout(resizeMap, 10); //delay to allow for image to resize
}

//resizes the image map
function resizeMap() {
    var img = document.getElementById("keyboard");
    var coords_Resized = coords.slice();    
    var sizeRatio = img.clientHeight / maxHeight;
    for (x = 0; x < coords.length; x++) {
        for (y = 0; y < coords[x].length; y++) {
            coords_Resized[x][y] = Math.round(coords[x][y] * sizeRatio);
        }
        document.getElementById("map" + keys[x]).coords = coords_Resized[x].toString(); 
    }

    document.getElementById("staff").style.top = Math.round(staffTop * sizeRatio) + "px";
    document.getElementById("staff").style.height = Math.round(staffHeight * sizeRatio) + "px";
    document.getElementById("staff").style.width = Math.round(img.clientWidth * 0.9) + "px";
    document.getElementById("lives").style.width = Math.round(img.clientWidth * 0.9) + "px";
    document.getElementById("lives").style.height = Math.round(livesHeight * sizeRatio) + "px";
    document.getElementById("wins").style.width = Math.round(img.clientWidth) + "px";
    document.getElementById("wins").style.fontSize = (scoreFontSize * sizeRatio) + "px";
    document.getElementById("timer").style.fontSize = (timerFontSize * sizeRatio) + "px";
    document.getElementById("menubutton").style.width = (menuButtonSize * sizeRatio) + "px";
    document.getElementById("menubutton").style.height = (menuButtonSize * sizeRatio) + "px";
    document.getElementById("settingsbutton").style.width = (menuButtonSize * sizeRatio) + "px";
    document.getElementById("settingsbutton").style.height = (menuButtonSize * sizeRatio) + "px";
    document.getElementById("topbar").style.width = Math.round(img.clientWidth * 0.999) + "px";
    document.getElementById("lives").style.left = Math.round(img.clientWidth * 0.65) + "px";
	
	document.getElementById("popup").style.width = Math.round(maxWidth * sizeRatio) + "px";
	
	document.getElementById("gameover").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("gameover").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("goheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("goheading").style.width = Math.round(img.clientWidth * 0.65) + "px";
	document.getElementById("scoreheading").style.fontSize = Math.round(scoreHeadingFontSize * sizeRatio) + "px";
	document.getElementById("score").style.fontSize = Math.round(scoreGOFontSize * sizeRatio) + "px";
	document.getElementById("bestscore").style.fontSize = Math.round(bestScoreFontSize * sizeRatio) + "px";
	document.getElementById("retrybutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("instructions").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("instructions").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("iheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("howto1").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("howto2").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("howto3").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("ibutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("enterhighscore").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("enterhighscore").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("ehsheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("initialsheading").style.fontSize = Math.round(enterHighScoreFontSize * sizeRatio) + "px";
	
	document.getElementById("highscores").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("highscores").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("hsheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("scores").style.fontSize = Math.round(highScoreFontSize * sizeRatio) + "px";
	document.getElementById("hsconfirmbutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
}
//fires when the key is pressed
function playNote(x) {
    //check if key has been disabled
    if (!disabled) { 
        document.getElementById("key" + keys[x]).style.display = "inline";
        if (useEESounds) {
            eeSounds[x].currentTime = 0;
            eeSounds[x].play();
        } else {
            keySounds[x].currentTime = 0;
            keySounds[x].play();
        }

        keysPressed.push(x);

        if (keysPressed.length > keysMax) {
            keysPressed.shift();
        }

        if (keysPressed.length == track.length && !easterEggMatch()) {
            disabled = true; //disable key presses when the full track length is complete
        }

        displayUserNotes();
        
    }
}

//fires on key mouseup
function endNoteTimer(x) {
    
    setTimeout(endNote, delay, x); //leaves the key coloured for the delay time        
}

//hides the coloured key overlay
function endNote(x) {

    document.getElementById("key" + keys[x]).style.display = "none";



    //compare user input with key sequence
        if (keysPressed.length <= track.length) {
            //if the user has started the easter egg sequence, do not confirm input
            //if the sequence has already been won or lost, do not call confirmCorrect again
            if (!easterEggMatch() && !sequenceComplete) {
                confirmCorrect();
            }
        } else if (keysPressed.length == easterEggSeq.length) {
            //check if input matches easter egg sequence
            if (easterEggMatch()) {
                easterEgg();
            }
        }

}

function easterEggMatch() {
    var eeMatch = true;
    var x = 0;
    while (x < keysPressed.length && eeMatch) {
        if (keysPressed[x] !== easterEggSeq[x]) {                
            eeMatch = false; 
        }
        x++;
    }

    return eeMatch;
}



//displays user's input on the staff
function displayUserNotes() {
    var staff = document.getElementById("staff");

    var newNote = document.createElement("IMG");

    switch (stage) {
        case 0: //shapes
            newNote.src = "./images/shapes/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
            newNote.className = "shapes";
            break;
        case 1: //shapes
            newNote.src = "./images/letters/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
            newNote.className = "letters";
            break;
        case 2: //staff
    }
    if (staff.childNodes.length >= keysMax) {
        staff.removeChild(staff.firstChild);
    }
    staff.appendChild(newNote);
}

//displays computer note sequence on staff
function displayCompNotes() {
    var staff = document.getElementById("staff");

    var selKey = keys[track[track.length - 1]];
    var newNote = document.createElement("IMG");

    
    switch (stage) {
        case 0: //shapes
            newNote.src = "./images/shapes/" + selKey + ".png";
            newNote.className = "shapes";
            break;
        case 1: //shapes
            newNote.src = "./images/letters/" + selKey + ".png";
            newNote.className = "letters";
            break;
        case 2: //staff
    }


    document.getElementById("key" + selKey).style.display = "inline";
    staff.appendChild(newNote);
}

//starts creation of computer's track
function playTrack() {
    //alert("PLAY TRACK");
    disabled = true; 
    resetTimer();
	createTrack();
    i = 0;    
}

//recursive function to create the random track one note at a time
function createTrack() {
    if (!paused) {
        
	    var position;
	    i++;

        //remove colours from previous key
        if (track.length > 0) {
            var lastKey = keys[track[track.length - 1]];
            document.getElementById("key" + lastKey).style.display = "none";
        }

	    if (i < trackLength) {
		    position = Math.floor((Math.random() * 11) + 0);
        
		    track.push(position);
            //use special sounds for track after easter egg
            if (useEESounds) {
                eeSounds[position].play();
                eeSounds[position].addEventListener("ended", createTrack); 
            } else {
		        keySounds[position].play();
                keySounds[position].addEventListener("ended", createTrack); 
            }		
		    displayCompNotes();
        } else {
            for (x = 0; x < keySounds.length; x++) {
                keySounds[x].removeEventListener("ended", createTrack);
                eeSounds[x].removeEventListener("ended", createTrack);
            } 
            setTimeout(clearStaff, staffDelay);
            setTimeout(runTimer, staffDelay);
            timerPaused = false; 
	    }

    } else {
        //set track to resume when the game is unpaused
        resumeTrack = true;
    }
}

//compares user input with computer's track
function isCorrect() {
	var confirm = 0;
	for(i = 0; i < keysPressed.length; i++) {
		if(keysPressed[i] == track[i]) {
			confirm++;
		}
	}


    if(confirm == keysPressed.length) {
		return true;
	} else {
		return false;
	}
}

//checks if the input was correct
function confirmCorrect() {
    //return to regular sounds after one sequence
    useEESounds = false; 

	if (isCorrect() && track.length == keysPressed.length) {
	    sequenceComplete = true; 
	    setTimeout(win, 1000);
	} else if (!isCorrect()) {
        sequenceComplete = true; 
	    setTimeout(lose, 1000);
	}
}

//user wins
function win() {
	//winCount++;
    winSound.play();

    document.getElementById("points").innerHTML = increaseScore();
    //increase track length after winsPerLength wins
	winsPerLengthCount++; 
    if (winsPerLengthCount == winsPerLength && trackLength < keysMax) {
        trackLength++;
        if(trackLength%2 == 0) {
            base = base + 5;
            countdownLength = countdownLength + 2;
        }
        winsPerLengthCount = 0; 
    }

    //document.getElementById("points").innerHTML = increaseScore();
    setTimeout(nextTrack, 1500);
    setTimeout(resetScore, 1500);
    resetMultiplier();
}

//user loses
function lose() {
	loseSound.play();
	lossCount++;
	document.getElementById("life" + lossCount).style.display = "none";
	resetTimer();
	timerPaused = true; 

    if (lossCount < 3) {
        setTimeout(nextTrack, 1500);
    } else {
        gameOver();
    }

}

//prepares for the next track
function nextTrack() {
    clearUserInput();
    track = [];
    i = 0;
    document.getElementById("timer").style.color = "white";
    setTimeout(playTrack, 500);
}

//clears user input
function clearUserInput() {
    clearStaff();
    keysPressed = [];
    sequenceComplete = false; 
}

//clears items from the staff
function clearStaff() {
    var staff = document.getElementById("staff");

    while (staff.hasChildNodes()) {
        staff.removeChild(staff.childNodes[0]);
    }

    disabled = false; 
}

//easter egg: sheep runs across screen
function easterEgg() {
    if (!easterEggRunning) {
        useEESounds = true; 
        easterEggRunning = true; 
        timerPaused = true; 
        $("#sheep").css("display", "inline");

        var width = "+=" + $(document).width();
        $("#sheep").animate({
            left: width
        }, 5000, function () {
            $("#sheep").css("display", "none");
            $("#sheep").css("left", "8px");
            easterEggRunning = false; 
            nextTrack();
        });
        
    }
 };

 //shows game over screen
 function gameOver() {
        pause(); 
		document.getElementById("score").innerHTML = runningScore;

        //check if user has won
		checkHighScore();  
 }

 //pauses and unpauses the game
 function pause() {
    paused = !paused;
    if (paused) {
        document.getElementById("overlay").style.display = "inline";
    } else {
        document.getElementById("overlay").style.display = "none";  
        if (resumeTrack) { //continue track creation if it has been paused
            setTimeout(createTrack, 100);
        }  
    }
    resumeTrack = false;    
 }
 
//changes the countdown number graphic
function changeCountdownIMG(){
	var countdownIMG = document.getElementById('countdown');
	
	countdownImageNumber = (countdownImageNumber + 1) % 5;
	countdownIMG.src = "images/countdown" + countdownImageNumber + ".png";
}

//countdown to start the game
function countdown(){
	var countdownIMG = document.getElementById('countdown');
		
	countdownIMG.style.display = 'block';
	countdownTimer = setInterval('changeCountdownIMG();', 1000);
	setTimeout(function( ) { clearInterval( countdownTimer ); }, 3000);
	setTimeout(function() {
		countdownIMG.style.display='none'
	}, 4000);
}
 
 //shows instructional popup
 function instructAppear() {
	 pause();
	 $("#instructions").animate({bottom: '100%'}, 1000);
 }
 
 //dismisses instructional popup
 function instructDismiss() {
	 $("#instructions").animate({bottom: '-550px'}, 1000);

     //start countdown
	 setTimeout("countdown();", 1000);

     //unpause the game and play the first track when the countdown is complete
	 setTimeout("pause();", 6000);
     setTimeout(playTrack, 6000)
 }

 function resetTimer() { 
    seconds = 0;
    timer.textContent = "0:00";
}

//the length of the timer's countdown in seconds
var countdownLength = 8;
 
//the seconds that still remain after the user plays the correct notes before timer end
var leftover;

//the base points that combines with a multiplier
var base = 10;

//the user's score so far
var runningScore = 0;

//the multiplier based on how many seconds are left after the user's correct input
var multiplier;

//returns the user's score so far in the game
function increaseScore() {
    runningScore = runningScore + (multiplier*base);
    return runningScore;
}

//resets the current score
function resetMultiplier() {
    multiplier = 0;
}
 
//recursive timer that resets to 0:00 after the user moves on to the next challenge.
//the timer starts counting down after the generated track is finished playing
function runTimer() {
    if (!timerPaused) {
 
        seconds--;
        if (seconds < 0) {
            seconds = countdownLength;//set the time length of countdown
        }

        

        multiplier = (countdownLength - leftover) - 1;

        if(leftover > 0 && isCorrect() && keysPressed.length == track.length) {
            seconds = 0;
        }
 
        timer.textContent = "0:" + (seconds > 9 ? seconds : "0" + seconds);
        leftover = countdownLength - seconds;
 
        if (seconds > 0) {
            setTimeout(runTimer, 1000); 
        }

        if (seconds == 0 && (!isCorrect() || keysPressed.length < track.length)) {
            lose(); 
        } else {            
            //set the control to red when under 3 seconds are left
            if (seconds <= 3 && seconds > 0) {
                document.getElementById("timer").style.color = "red";
            } else {            
                document.getElementById("timer").style.color = "white";
            }
        }

        
       //set the control to red when under 3 seconds are left
       if (seconds <= 3 && seconds > 0) {
            document.getElementById("timer").style.color = "red";
       } else {            
            document.getElementById("timer").style.color = "white";
       }
        
    }
 }

 
//checks if user made them top 5 scores and checks their position
function checkHighScore() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var position = parseInt(xmlhttp.responseText.charAt(0));
            if (position > 0) {
                var heading;
                switch (position) {
                    case 1:
                        heading = "You placed first!";
                        break;
                    case 2:
                        heading = "You placed second!";
                        break;
                    case 3:
                        heading = "You placed third!";
                        break;
                    case 4:
                        heading = "You placed fourth!";
                        break;
                    case 5:
                        heading = "You placed fifth!";
                        break;
                }
                document.getElementById("position").innerHTML = heading;
                enterHighScores();
            } else {
                $("#gameover").animate({bottom: '550px'});
            }
        }
    };
      
    xmlhttp.open("GET", "../php/gethighscores.php?Score=" + runningScore, true);
    xmlhttp.send(); 
}


//brings up the high scores popup
function showHighScores() {
     getHighScores();
	 $("#highscores").animate({bottom: '1750px'}, 1000);  
}

//hides the high scores popup
function dismissHighScores() {
	 $("#highscores").animate({bottom: '-1350px'}, 1000);
     $("#gameover").animate({bottom: '550px'});  
}

//brings up the enter high scores popup
function enterHighScores() {
	 $("#enterhighscore").animate({bottom: '1350px'}, 1000);    
}

//hides the enter high scores popup
function dismissEnterHighScores() {
	 $("#enterhighscore").animate({bottom: '-950px'}, 1000);
}

//submits new high score into the database
function submitScore() {
    var name = document.getElementById("enterinitials").value; 
    if (validateName(name)) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                dismissEnterHighScores(); 
                showHighScores();
            }
        };

        xmlhttp.open("GET", "../php/updatescore.php?Name=" + name + "&Score=" + runningScore, true);
        xmlhttp.send();
    }
}

//checks that high score name is only valid characters
function validateName(name) {
    return (/[A-Za-z]/); 
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

//will later open a drop-down menu, but currently just links to the main menu
function loadMenu() {
    location.href = "mainmenu.html";
}