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

//default font size for login content
var loginFontSize = 30;

//default font size for register content
var registerFontSize = 20;

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

//names of all keys
var keys = ["c", "cSharp", "d", "dSharp", "e", "f", "fSharp", "g", "gSharp", "a", "aSharp", "b"];

//scales for note generation

//Level One Scales: C Major, A Melodic Minor
var CMajor = [0, 2, 4, 5, 7, 9, 11];
var AMinor = [0, 2, 4, 5, 6, 7, 8, 9, 11];

//Level Two Scales: C# Major, A# Melodic Minor
var CSharpMajor = [0, 1, 3, 5, 6, 8, 10];
var ASharpMinor = [0, 1, 3, 5, 6, 7, 8, 9, 10];


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

//**COMPUTER GENERATED TRACK**

//the current position when playing through the track
var i = 0;

//array of notes for the random track
var track = [];

//randomly selected scale (0=Major, 1=Minor)
var scale = 0; 

//**EASTER EGG

//array of notes to activate the easter egg
var easterEggSeq = [4, 2, 0, 2, 4, 4, 4];

//true if easter egg is currently running
var easterEggRunning = false; 

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

//0=Level 1, 1=Level 2
var difficulty = 0;

//**USER VARIABLES**

//Login.ID in the database
var userID = 0;

//the user's 3-letter name
var userName = "";

//0=piano, 1=harpsichord, 2=moog synth
var instrument = 0;

//0=standard theme, 1=unlockable theme
var theme = 0;


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

//the best score retrieved from the game.html document itself, not from cookies
var bestscore = 0;

//**PAGE LOADING SEQUENCE**

//don't load the page until login is complete
getLogin();

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

	if (theme == 0) {
		switch (stage) {
			case 0:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard_shapes.png";
				}
				instructAppear();
				break;
			case 1:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard_letters.png";
				}
				instructAppear();
				break;
			case 2:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard_staff_lvl2.png";
				} else {
					document.getElementById("keyboard").src = "images/NoteAble_Keyboard_staff_lvl1.png";
				}
				instructAppear();
				break;
			case 3:
				document.getElementById("keyboard").src = "images/NoteAble_Keyboard.png";
				freeMode();
		}
	} else if (theme == 1) {
		document.getElementById('life1').src = "images/classic/lives.png";
		document.getElementById('life2').src = "images/classic/lives.png";
		document.getElementById('life3').src = "images/classic/lives.png";
		switch (stage) {
			case 0:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard_shapes.png";
				}
				instructAppear();
				break;
			case 1:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard_letters.png";
				}
				instructAppear();
				break;
			case 2:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard_staff_lvl2.png";
				} else {
					document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard_staff_lvl1.png";
				}
				instructAppear();
				break;
			case 3:
				document.getElementById("keyboard").src = "images/classic/NoteAble_Keyboard.png";
				freeMode();
		}
	} else if (theme == 2) {
		document.getElementById('life1').src = "images/retro/lives.png";
		document.getElementById('life2').src = "images/retro/lives.png";
		document.getElementById('life3').src = "images/retro/lives.png";
		switch (stage) {
			case 0:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard_shapes.png";
				}
				instructAppear();
				break;
			case 1:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard.png";
				} else {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard_letters.png";
				}
				instructAppear();
				break;
			case 2:
				if (difficulty == 1) {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard_staff_lvl2.png";
				} else {
					document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard_staff_lvl1.png";
				}
				instructAppear();
				break;
			case 3:
				document.getElementById("keyboard").src = "images/retro/NoteAble_Keyboard.png";
				freeMode();
		}
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
   
   imageMapResize();

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
	
	document.getElementById("gameover").style.left = Math.round(img.clientWidth * 0.225) + "px";
	//document.getElementById("gameover").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("gameover").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("gameover").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("goheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("goheading").style.width = Math.round(img.clientWidth * 0.65) + "px";
	document.getElementById("scoreheading").style.fontSize = Math.round(scoreHeadingFontSize * sizeRatio) + "px";
	document.getElementById("score").style.fontSize = Math.round(scoreGOFontSize * sizeRatio) + "px";
	document.getElementById("bestscore").style.fontSize = Math.round(bestScoreFontSize * sizeRatio) + "px";
	document.getElementById("retrybutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";

	document.getElementById("instructions").style.left = Math.round(img.clientWidth * 0.225) + "px";
	//document.getElementById("instructions").style.top = Math.round(img.clientHeight * 1.2) + "px"
	document.getElementById("instructions").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("instructions").style.height = Math.round(img.clientHeight * 0.585) + "px";
	

	document.getElementById("iheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("howto1").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("howto2").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("howto3").style.fontSize = Math.round(instructionFontSize * sizeRatio) + "px";
	document.getElementById("ibutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("enterhighscore").style.left = Math.round(img.clientWidth * 0.225) + "px";
	//document.getElementById("enterhighscore").style.top = Math.round(img.clientHeight * 1.2) + "px";
	document.getElementById("enterhighscore").style.width = Math.round(img.clientWidth * 0.55) + "px";
	document.getElementById("enterhighscore").style.height = Math.round(img.clientHeight * 0.585) + "px";
	document.getElementById("ehsheading").style.fontSize = Math.round(popupHeadingFontSize * sizeRatio) + "px";
	document.getElementById("initialsheading").style.fontSize = Math.round(enterHighScoreFontSize * sizeRatio) + "px";
	document.getElementById("enterinitials").style.width = Math.round(img.clientWidth * 0.22) + "px";
	document.getElementById("enterinitials").style.height = Math.round(img.clientHeight * 0.125) + "px";
	document.getElementById("ehsbutton").style.fontSize = Math.round(buttonFontSize * sizeRatio) + "px";
	
	document.getElementById("highscores").style.left = Math.round(img.clientWidth * 0.225) + "px";
	//document.getElementById("highscores").style.top = Math.round(img.clientHeight * 1.2) + "px";
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

        var soundUrl; 
        if (useEESounds) {           
            soundUrl = "sounds/sheep/" + keys[x] + ".mp3";
        } else {
            switch (instrument) {
                case 0: //piano
                    soundUrl = "sounds/" + keys[x] + ".mp3";
                    break;
                case 1: //harpsichord
                    soundUrl = "sounds/harpsichord/" + keys[x] + ".mp3";
                    break;
                case 2: //moog synth
                    soundUrl = "sounds/moog/" + keys[x] + ".mp3";
                    break;                
            }
        }

        var sound = new Howl({
            urls: [soundUrl]
        }).play();

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
			if (theme == 2) {
				newNote.src = "./images/shapes/retro/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "shapes";
			} else {
				newNote.src = "./images/shapes/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "shapes";
            }
			break;
        case 1: //letters
			if (theme == 1) {
				newNote.src = "./images/letters/classic/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
			} else if ( theme == 2) {
				newNote.src = "./images/letters/retro/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
			} else {
				newNote.src = "./images/letters/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
            }
			break;
        case 2: //staff
			if (theme == 2) {
				newNote.src = "./images/staff/retro/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "notes";
			} else {
				newNote.src = "./images/staff/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "notes";
            }
			break;
        case 3: 
            if (theme == 1) {
				newNote.src = "./images/letters/classic/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
			} else if ( theme == 2) {
				newNote.src = "./images/letters/retro/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
			} else {
				newNote.src = "./images/letters/" + keys[keysPressed[keysPressed.length - 1]] + ".png";
				newNote.className = "letters";
            }
			break;
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
			if (theme == 2) {
				newNote.src = "./images/shapes/retro/" + selKey + ".png";
				newNote.className = "shapes";
			} else {
				newNote.src = "./images/shapes/" + selKey + ".png";
				newNote.className = "shapes";
            }
			break;
        case 1: //letters
			if (theme == 1) {
				newNote.src = "./images/letters/classic/" + selKey + ".png";
				newNote.className = "letters";
			} else if ( theme == 2) {
				newNote.src = "./images/letters/retro/" + selKey + ".png";
				newNote.className = "letters";
			} else {
				newNote.src = "./images/letters/" + selKey + ".png";
				newNote.className = "letters";
            }
			break;
        case 2: //staff
			if (theme == 2) {
				newNote.src = "./images/staff/retro/" + selKey + ".png";
				newNote.className = "notes";
			} else {
				newNote.src = "./images/staff/" + selKey + ".png";
				newNote.className = "notes";
            }
			break;
        case 3: 
            if (theme == 1) {
				newNote.src = "./images/letters/classic/" + selKey + ".png";
				newNote.className = "letters";
			} else if ( theme == 2) {
				newNote.src = "./images/letters/retro/" + selKey + ".png";
				newNote.className = "letters";
			} else {
				newNote.src = "./images/letters/" + selKey + ".png";
				newNote.className = "letters";
            }
			break;
    }


    document.getElementById("key" + selKey).style.display = "inline";
    staff.appendChild(newNote);
}


//starts creation of computer's track
function playTrack() {
    disabled = true; 
    resetTimer();
    
    //randomly select major or minor scale
    scale = Math.round(Math.random());
	
    createTrack();

    i = 0;    
}

//generates a random note based on the level and scale
function generateNote() {

    var note = 0;
    var position = 0; 
    if (scale > 0) { //use minor scale
        position = Math.floor((Math.random() * 9));
        if (difficulty == 0) { //level 1
            note = AMinor[position];
        } else { //level 2
            note = ASharpMinor[position];
        }
    } else { //use major scale
        position = Math.floor((Math.random() * 7));
        if (difficulty == 0) { //level 1
            note = CMajor[position];
        } else { //level 2
            note = CSharpMajor[position];
        }
    }

    return note; 
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
		    position = generateNote(scale);

        
		    track.push(position);
		    var soundUrl;
            //use special sounds for track after easter egg
            if (useEESounds) {
                soundUrl = "sounds/sheep/" + keys[position] + ".mp3";
            } else {
                switch(instrument) {
                    case 0: //piano
                        soundUrl = "sounds/" + keys[position] + ".mp3";
                        break;
                    case 1: //harpsichord
                        soundUrl = "sounds/harpsichord/" + keys[position] + ".mp3";
                        break;
                    case 2: //moog synth
                        soundUrl = "sounds/moog/" + keys[position] + ".mp3";              
                }
            }
            var sound = new Howl({
                urls: [soundUrl],
                onend: function() {
                    createTrack();
                }
            }).play();
                	
		    displayCompNotes();
        } else {
            setTimeout(clearStaff, staffDelay);
            setTimeout(runTimer, staffDelay);
            timerPaused = false; 
	    }

    } else {
        //set track to resume when the game is unpaused
        resumeTrack = true;
    }
}
/*
//the number of times the user has pressed a key
var currentcount = 0;

//before the user gets to complete a full length input
//they lose a life if the input so far is incorrect
function confirmCurrentCorrect(curr) {
    if(keysPressed[curr] != track[curr]) {
        lose();
    } 
}*/

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
	if (isCorrect() && track.length == keysPressed.length) {
	    sequenceComplete = true;
	    useEESounds = false; 
	    setTimeout(win, 1000);
	} else if (!isCorrect()) {
        sequenceComplete = true;
        useEESounds = false;
	    setTimeout(lose, 1000);
	}
}

//user wins
function win() {
    var sound = new Howl({
        urls: ["sounds/win.mp3"]
    }).play();

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
    //getSessionScore();

    //document.getElementById("points").innerHTML = increaseScore();
    setTimeout(nextTrack, 1500);
    setTimeout(resetScore, 1500);
    resetMultiplier();
}

//user loses
function lose() {
    var sound = new Howl({
        urls: ["sounds/lose.mp3"]
    }).play();
	lossCount++;
	document.getElementById("life" + lossCount).style.display = "none";
	resetTimer();
	timerPaused = true; 

    if (lossCount < 3) {
        setTimeout(nextTrack, 1500);
    } else {
        setupGameOver();
    }

}

//prepares for the next track
function nextTrack() {
    //currentcount = 0;
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

 //prepare for game over screen
 function setupGameOver() {
        pause(); 
		document.getElementById("score").innerHTML = runningScore;
        
        //update the user's high score values if they are logged in
        if (userID > 0 && runningScore > 0) {
		    updateUserValues();   
        } else {
            //go straight to game over
            gameOver();      
        }

 }
 
 //shows game over screen
 function gameOver() {
    //get the user's best score for the game over menu
    getSessionScore();

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
     document.getElementById("iheading").innerHTML = "Instructions";
     document.getElementById("howto1").innerHTML = "Play back the notes";
     document.getElementById("howto2").innerHTML = "shown on the";
     document.getElementById("howto3").innerHTML = "score.";


     document.getElementById("ibutton").addEventListener("click", instructDismiss);
	 pause(); 
     $("#instructions").animate({bottom: '20%'}, 1000);
	 //$("#instructions").animate({bottom: '120%'}, 1000);
 }
 
 //dismisses instructional popup
 function instructDismiss() {
	 //$("#instructions").animate({bottom: '-55.5%'}, 1000);
	 $("#instructions").animate({bottom: '-85.5%'}, 1000);

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
            useEESounds = false;
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
                $("#gameover").animate({bottom: '20%'}, 1000);
                //$("#gameover").animate({bottom: '120%'}, 1000);
            }
        }
    };
      
    xmlhttp.open("GET", "../php/gethighscores.php?Score=" + runningScore, true);
    xmlhttp.send(); 
}


//brings up the high scores popup
function showHighScores() {
     getHighScores();
	 $("#highscores").animate({bottom: '20%'}, 1000); 
	 //$("#highscores").animate({bottom: '120%'}, 1000);  
}

//hides the high scores popup
function dismissHighScores() {
	 /*$("#highscores").animate({bottom: '-55.5%'}, 1000);
     $("#gameover").animate({bottom: '120%'});  */
	 $("#highscores").animate({bottom: '-85.5%'}, 1000);
     $("#gameover").animate({bottom: '20%'});  
}

//brings up the enter high scores popup
function enterHighScores() {
    //fill in name if user is logged in
    if (userID > 0) {
        document.getElementById("enterinitials").value = userName;
    }
     document.getElementById("enterhighscoreresponse").innerHTML = "";
	 //$("#enterhighscore").animate({bottom: '120%'}, 1000);    
	 $("#enterhighscore").animate({bottom: '20%'}, 1000);    
}

//hides the enter high scores popup
function dismissEnterHighScores() {
	// $("#enterhighscore").animate({bottom: '-55.5%'}, 1000);
	 $("#enterhighscore").animate({bottom: '-85.5%'}, 1000);
}

//submits new high score into the database
function submitScore() {
    var name = document.getElementById("enterinitials").value; 
    if (validateName(name)) {

        //the best score retrieved from the game.html document itself, not from cookies
        //not sure if it will be sent to updatescore.php
        bestscore = document.getElementById("bestscore").innerHTML; 

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                dismissEnterHighScores(); 
                showHighScores();
            }
        };

        xmlhttp.open("GET", "../php/updatescore.php?Name=" + name + "&Score=" + runningScore, true);
        xmlhttp.send();
    } else {
        document.getElementById("enterhighscoreresponse").innerHTML = "Invalid name; only letters allowed.";
    }
}

//checks that high score name is only valid characters
function validateName(name) {
    return /[A-Za-z]{3}/.test(name); 
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

//will later open a drop-down menu, but currently just links to the main menu
function loadMenu() {
    location.href = "mainmenu.html";
}


//sends the running score to score.php to get processed and set into session variables
function getSessionScore() {
    var myurl = './php/score.php';
    var http = new XMLHttpRequest();
    var modurl = myurl+"?score="+runningScore;
    http.open("GET", modurl, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (runningScore > 0) {
                document.getElementById("bestscore").innerHTML = http.responseText;
            }
        }
    };
    http.send();
}

//checks if a user is logged in and retrieves their login information
function getLogin() {
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

            }
            
            loadPage();
        }
    };

    xmlhttp.open("GET", "./php/getlogin.php", true);
    xmlhttp.send();    
}




function freeMode() {
    document.getElementById("lives").innerHTML = "";
    document.getElementById("wins").style.marginTop= '12px';
    document.getElementById("wins").innerHTML = 'Free Mode';
    document.getElementById("timer").innerHTML = "";
}



//updates the user's highest score and cumulative scores
//checks if anything new has been unlocked 
function updateUserValues() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var result = xmlhttp.responseText.split("{");
            var unlocked = parseInt(result[0]);

            if (unlocked > 0) {
                var unlockedName = "";
                switch (unlocked) {
                    case 1:
                        unlockedName = "Free Mode";
                        break;
                    case 2:
                        unlockedName = "Sound Options";
                        break;
                    case 3:
                        unlockedName = "Theme Options";
                        break;
                }


                
                document.getElementById("iheading").innerHTML = "Unlocked!";
                document.getElementById("howto1").innerHTML = "You've unlocked";
                document.getElementById("howto2").innerHTML = unlockedName + "!";
                document.getElementById("howto3").innerHTML = "";


                document.getElementById("ibutton").removeEventListener("click", instructDismiss);
                document.getElementById("ibutton").addEventListener("click", unlockDismiss);
	            //$("#instructions").animate({bottom: '120%'}, 1000);
	            $("#instructions").animate({bottom: '20%'}, 1000);
            } else {
                gameOver(); 
            }
        }
    };

    xmlhttp.open("GET", "./php/updateuservalues.php?Score=" + runningScore, true);
    xmlhttp.send();
}

//dismisses the unlocked popup
function unlockDismiss() {
	 //$("#instructions").animate({bottom: '-55.5%'}, 1000);
	 $("#instructions").animate({bottom: '-85.5%'}, 1000);
     gameOver(); 
}