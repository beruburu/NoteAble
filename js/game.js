//***SCREEN RESIZING***

//default height and width of keyboard image
var maxHeight = 670;
var maxWidth = 1027;

//default location and size of musical staff
var staffTop = 81;
var staffHeight = 143;

//default height of the lives list
var livesHeight = 50; 

//default font size for the highscore
var scoreFontSize = 30;

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
keySounds[0].src = "sounds/C.wav";
keySounds[1] = new Audio();
keySounds[1].src = "sounds/CSharp.wav";
keySounds[2] = new Audio();
keySounds[2].src = "sounds/D.wav";
keySounds[3] = new Audio();
keySounds[3].src = "sounds/DSharp.wav";
keySounds[4] = new Audio();
keySounds[4].src = "sounds/E.wav";
keySounds[5] = new Audio();
keySounds[5].src = "sounds/F.wav";
keySounds[6] = new Audio();
keySounds[6].src = "sounds/FSharp.wav";
keySounds[7] = new Audio();
keySounds[7].src = "sounds/G.wav";
keySounds[8] = new Audio();
keySounds[8].src = "sounds/GSharp.wav";
keySounds[9] = new Audio();
keySounds[9].src = "sounds/A.wav";
keySounds[10] = new Audio();
keySounds[10].src = "sounds/ASharp.wav";
keySounds[11] = new Audio();
keySounds[11].src = "sounds/B.wav";

//names of all keys
var keys = ["C", "CSharp", "D", "DSharp", "E", "F", "FSharp", "G", "GSharp", "A", "ASharp", "B"];


//***USER INPUT***

//arrays of keys pressed
var keysPressed = [];

//whether pressed keys have been unpressed or not; 1= still pressed
var keyValues = [];

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

//**OTHER VARIABLES**

//array of notes to activate the easter egg
var easterEggSeq = [4, 2, 0, 2, 4, 4, 4];

//true if the keyboard is disabled
var disabled = false;

//true if confirmCorrect has been fired for this sequence
var confirming = false;

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


//**PAGE LOADING SEQUENCE**
loadPage();
playTrack();

//sets up the page
function loadPage() {
    //add event listeners for dynamic image map 
    window.addEventListener('resize', resizeWindow);
    document.getElementById("keyboard").addEventListener('load', resizeMap);

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
}
//fires when the key is pressed
function playNote(x) {
    //check if key has been disabled
    if (!disabled) { 
        document.getElementById("key" + keys[x]).style.display = "inline";
        keySounds[x].currentTime = 0;
        keySounds[x].play();

        keysPressed.push(x);
        keyValues.push(1);

        if (keysPressed.length > keysMax) {
            keysPressed.shift();
            keyValues.shift();
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
    
    //check for a match once the user has entered enough keys
    if (keysPressed.length == track.length) {
        //if the user has started the easter egg sequence, do not confirm input
        //if confirmCorrect has already been fired for this sequence, do not confirm input
        if (!easterEggMatch() && !confirming) {
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
    disabled = true; 
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
        
            keySounds[position].addEventListener("ended", createTrack); 
		    track.push(position);		
		    keySounds[position].play();
		    displayCompNotes();
        } else {
            for (x = 0; x < keySounds.length; x++) {
                keySounds[x].removeEventListener("ended", createTrack);
            } 
            setTimeout(clearStaff, staffDelay);
	    }

    } else {
        //set track to resume when the game is unpaused
        resumeTrack = true;
    }
}

//compares user input with computer's track
function isCorrect() {
	var confirm = 0;
	for(i = 0; i < track.length; i++) {
		if(keysPressed[i] == track[i]) {
			confirm++;
		}
	}


    if(confirm == track.length) {
		return true;
	} else {
		return false;
	}
}

//checks if the input was correct
function confirmCorrect() {
    confirming = true; 
	if (isCorrect()) {
	    win();
	} else {
	    lose();
	}
}

//user wins
function win() {
	winCount++;
    
    //increase track length after winsPerLength wins
	winsPerLengthCount++; 
    if (winsPerLengthCount == winsPerLength && trackLength < keysMax) {
        trackLength++;
        winsPerLengthCount = 0; 
    }

	document.getElementById("wins").innerHTML = "Wins: " + winCount;
    setTimeout(nextTrack, 500);
}

//user loses
function lose() {
	lossCount++;
	document.getElementById("life" + lossCount).style.display = "none";

    if (lossCount < 3) {
        setTimeout(nextTrack, 500);
    } else {
        gameOver();
    }

}

//prepares for the next track
function nextTrack() {
    clearUserInput();
    track = [];
    i = 0;
    setTimeout(playTrack, 500);
}

//clears user input
function clearUserInput() {
    clearStaff();
    keysPressed = [];
    keyValues = [];
    confirming = false; 
}

//clears items from the staff
function clearStaff() {
    var staff = document.getElementById("staff");

    while (staff.hasChildNodes()) {
        staff.removeChild(staff.childNodes[0]);
    }

    disabled = false; 
}

//remove lives when user has lost
function removeLife() {
	var ulElem = document.getElementById("lives");
	var i = 0;
	
	if (!isCorrect()) {
		ulElem.removeChild(ulElem.childNodes[i]);
		i++;
	}
}

//TIMER CODE: INCOMPLETE SO COMMENTED OUT
/*    var timer1 = document.getElementById('timer');
    var seconds = 0;
    var minutes = 1;
    var t;

function incrementTimer() {
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
        }
    }

    timer1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "0") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    runTimer();
}

function runTimer() {
    if (seconds>0 || minutes>0) {
        t = setTimeout(incrementTimer, 1000); 
    } 
}
runTimer();
*/

//easter egg: sheep runs across screen
function easterEgg() {
        $("#sheep").css("display", "inline");

        var width = "+=" + $(document).width();
        $("#sheep").animate({
            left: width
        }, 5000, function () {
            $("#sheep").css("display", "none");
            $("#sheep").css("left", "8px");
            nextTrack();
        });
 };

 //shows game over screen
 function gameOver() {
        pause(); 
        $("#gameover").animate({bottom: '550px'});  
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