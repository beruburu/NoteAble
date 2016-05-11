//actual height and width of keyboard image
var maxHeight = 670;
var maxWidth = 1027;

//default location of musical staff
var staffTop = 110; 

//delay before resetting a pressed key
var delay = 600;

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


loadPage();

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
}

//fires when the key is pressed
function playNote(x) {
    document.getElementById("key" + keys[x]).style.display = "inline";
    var audio = new Audio("sounds/" + keys[x] + ".wav");
    audio.play();

    keysPressed.push(x);
    keyValues.push(1);

    if (keysPressed.length > keysMax) {
        keysPressed.shift();
        keyValues.shift();
    }

    displayUserNotes();
}

//fires when the window is resized
function resizeWindow() {
    setTimeout(resizeMap, 10); //10 second delay to allow for image to resize
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