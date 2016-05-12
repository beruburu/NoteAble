//actual height and width of keyboard image
var maxHeight = 670;
var maxWidth = 1027;

//default location and size of musical staff
var staffTop = 81;
var staffHeight = 143;

//default height of the lives list
var livesHeight = 50; 

//default font size for the highscore
var scoreFontSize = 22;

//delay before resetting a pressed key
var delay = 600;
//delay before hiding the computer's staff
var staffDelay = 1000;

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

//names of all keys
var keys = ["C", "CSharp", "D", "DSharp", "E", "F", "FSharp", "G", "GSharp", "A", "ASharp", "B"];

//arrays of keys pressed
var keysPressed = [];
//whether pressed keys have been unpressed or not; 1= still pressed
var keyValues = [];

//the maximum length of the user sequence
var keysMax = 9;

var trackLength = 3; //temporarily set to 3
var i = 0;
var track = [];
var correct = false;

//the number of times the user has won
var winCount = 0;

//the number of times the user has lost
var lossCount = 0; 

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

//whether or not key presses are disabled
var disabled = false; 

loadPage();

playTrack(); 

//sets up the page
function loadPage() {
    //Event listeners for dynamic image map 
    window.addEventListener('resize', resizeWindow);
    document.getElementById("keyboard").addEventListener('load', resizeMap);
}

//fires on key mouseup
function endNoteTimer(x) {
    setTimeout(endNote, delay);
}

//hides the coloured key overlay
function endNote() {
    var firstPressed = -1; //the first key that has been pressed and not yet unpressed
    var x = 0;
    while (x < keysPressed.length && firstPressed == -1) {
        if (keyValues[x] == 1) {
           firstPressed = keysPressed[x];
           keyValues[x] = 0; //reset to 0 for unpressed
        }
        x++;
    }
    document.getElementById("key" + keys[firstPressed]).style.display = "none";
    
    //check for a match once the user has entered enough keys
    if (keysPressed.length == track.length) {
        confirmCorrect();
    }
}

//fires when the key is pressed
function playNote(x) {
    if (!disabled) {
        document.getElementById("key" + keys[x]).style.display = "inline";
        keySounds[x].play();

        keysPressed.push(x);
        keyValues.push(1);

        if (keysPressed.length > keysMax) {
            keysPressed.shift();
            keyValues.shift();
        }

        displayUserNotes();        
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

//displays musical staff of user's note arrays
function displayUserNotes() {
    var staff = document.getElementById("staff");

    var newShape = document.createElement("IMG");
    newShape.src = "./images/shapes/" + keys[keysPressed[keysPressed.length -1]] + ".png";
    newShape.className = "shapes";

    if (staff.childNodes.length >= keysMax) {
        staff.removeChild(staff.firstChild);
    }
    staff.appendChild(newShape);
}

//displays computer note sequence on staff
function displayCompNotes() {
    var staff = document.getElementById("staff");

    var selKey = keys[track[track.length - 1]];
    var newShape = document.createElement("IMG");
    newShape.src = "./images/shapes/" + selKey + ".png";
    newShape.className = "shapes";

    document.getElementById("key" + selKey).style.display = "inline";
    staff.appendChild(newShape);
}

//create the track one note at a time
function createTrack() {
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


}

//starts recursive createTrack function
function playTrack() {
    disabled = true;
	createTrack();
    i = 0;
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
	if (isCorrect()) {
	    win();
	} else {
	    lose(); 
	}
}

//computer user win
function win() {
	winCount++;
	document.getElementById("wins").innerHTML = "Wins: " + winCount;
    setTimeout(nextTrack, 500);
}

//compute user loss
function lose() {
	lossCount++;
	document.getElementById("life" + lossCount).style.display = "none";
    
    setTimeout(nextTrack, 500);
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
}

//clears items from the staff
function clearStaff() {
    var staff = document.getElementById("staff");

    while (staff.hasChildNodes()) {
        staff.removeChild(staff.childNodes[0]);
    }

    disabled = false; 
}



//easter egg
var myTimer = null;
var imageNumber = 0;

function move() {
	var sheep = document.getElementById('sheep');
	
	sheep.style.left = parseInt(sheep.style.left) + 1 + "px";
	imageNumber = (imageNumber + 1) % 5;
	sheep.src = "images/easteregg/rainbow_sheep" + imageNumber + ".png";
}

function moveAccordinToKeyPressed(e) {
	if (e.event) {
		theKeyPressed = e.keyCode;
	}else if (e.which) {
		theKeyPressed = e.which;
	}
	if (theKeyPressed == 39) {
		if(myTimer == null){
				myTimer = setInterval('move();', 50);
			}else{
				clearInterval(myTimer);
				myTimer = null;
			}
	}
}

window.onload=function() {
	var sheep = document.getElementById('sheep');
	window.onkeydown=moveAccordingToKeyPressed;
	
	sheep.onclick=function() {
		if(myTimer == null) {
			myTimer = setInterval('move();', 50);
		}else{
			clearInterval(myTimer);
			myTimer = null;
		}
	}
}