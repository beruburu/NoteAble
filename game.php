<!DOCTYPE html>

<html lang="en">
    <head>
        <!--Basic style sheet-->
        <link rel="stylesheet" type="text/css" href="style/style.css">
        <!--Style sheet for this page-->
        <link rel="stylesheet" type="text/css" href="style/game.css">
        <!--Style sheet for gameover popup-->
        <link rel="stylesheet" type="text/css" href="style/gameoverpopup.css">
		<!--Style sheet for instructions popup-->
		<link rel="stylesheet" type="text/css" href="style/instructionpopup.css">
        <!--Javascript for this page-->
        <script src="js/game.js" defer></script>
        <!--JQuery reference-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <meta charset="utf-8" />
        <title>NoteAble</title>
    </head>
    <body>
		
        <!--Container for keyboard images-->
        <div id="container">

        <!--Top menu bar-->
		<div id="topbar">
	        <!--Menu button-->
            <button id="menubutton"></button> 
            <!--Settings button-->   
            <button id="settingsbutton"></button>
		</div>

        

		
        <!--Container for music notes showing user's lives-->
        <div id="lives">
            <img src="images/lives.png" alt="life" class="lifeimg" id="life1">
            <img src="images/lives.png" alt="life" class="lifeimg" id="life2">
            <img src="images/lives.png" alt="life" class="lifeimg" id="life3">
        </div>


        <!--Sheep image for easter egg-->
		<img src="images/easteregg/rainbowsheep.gif" id="sheep" alt="sheep">

        <!--Blank keyboard image-->
        <img src="images/NoteAble_Keyboard.png" id="keyboard" alt="keyboard">

        <!--Coloured key images for all notes-->
        <img src="images/c.png" id="keyC" class="keys" alt="c">
        <img src="images/cSharp.png" id="keyCSharp" class="keys" alt="csharp">
        <img src="images/d.png" id="keyD" class="keys" alt="d">
        <img src="images/dSharp.png" id="keyDSharp" class="keys" alt="dsharp">
        <img src="images/e.png" id="keyE" class="keys" alt="e">
        <img src="images/f.png" id="keyF" class="keys" alt="f">
        <img src="images/fSharp.png" id="keyFSharp" class="keys"  alt="fsharp">
        <img src="images/g.png" id="keyG" class="keys" alt="g">
        <img src="images/gSharp.png" id="keyGSharp" class="keys" alt="gsharp">
        <img src="images/a.png" id="keyA" class="keys" alt="a">
        <img src="images/aSharp.png" id="keyASharp" class="keys" alt="asharp">
        <img src="images/b.png" id="keyB" class="keys" alt="b">

        <!--Transparent image on top to implement image map-->
        <img src="images/transparent.png" id="transparent" alt="keyboard" usemap="#keymap">

        <!--Image map for the keys
            Activates playNote function to play the note when key is clicked
            Activates endNoteTimer function to start a timer to end the note when key is released
            -->
        <map name="#keymap">
           <area shape="poly" id="mapC" coords="3,252,109,252,109,494,143,494,143,662,3,662" onmousedown="playNote(0)" onmouseup="endNoteTimer(0)">
           <area shape="rect" id="mapCSharp" coords="112,254,183,491" onmousedown="playNote(1)" onmouseup="endNoteTimer(1)">
           <area shape="poly" id="mapD" coords="151,494,185,494,185,253,255,253,255,494,292,494,292,659,151,659" onmousedown="playNote(2)" onmouseup="endNoteTimer(2)">
           <area shape="rect" id="mapDSharp" coords="256,254,329,491" onmousedown="playNote(3)" onmouseup="endNoteTimer(3)">
           <area shape="poly" id="mapE" coords="299,494,330,494,330,254,439,254,439,662,299,662" onmousedown="playNote(4)" onmouseup="endNoteTimer(4)">
           <area shape="poly" id="mapF" coords="444,254,550,254,550,494,593,494,581,661,444,660" onmousedown="playNote(5)" onmouseup="endNoteTimer(5)">
           <area shape="rect" id="mapFSharp" coords="551,253,622,492" onmousedown="playNote(6)" onmouseup="endNoteTimer(6)">
           <area shape="poly" id="mapG" coords="589,663,590,494,624,493,625,254,695,253,696,491,726,495,728,662" onmousedown="playNote(7)" onmouseup="endNoteTimer(7)">
           <area shape="rect" id="mapGSharp" coords="698,253,767,492" onmousedown="playNote(8)" onmouseup="endNoteTimer(8)">
           <area shape="poly" id="mapA" coords="735,494,769,494,770,254,841,255,841,491,875,496,875,662,735,662" onmousedown="playNote(9)" onmouseup="endNoteTimer(9)">
           <area shape="rect" id="mapASharp" coords="840,253,912,492" onmousedown="playNote(10)" onmouseup="endNoteTimer(10)">
           <area shape="poly" id="mapB" coords="882,44,914,494,914,254,1020,254,1020,659,882,659" onmousedown="playNote(11)" onmouseup="endNoteTimer(11)">
        </map> 
        </div>

        <!--The staff that displays the notes-->
        <div id="staff">
        </div>
        
        <!--Div to display the user's win count (will later show score)-->
        <div id="wins">
            Score: 
            <div id= "points">0</div>
        </div>
        
        <!-- Timer -->
        <div id = "timer"><time>0:00</time></div>
        
        <!--A transparent overlay over the screen during pause or game over-->
        <div id="overlay">
        </div>
        

        <!--Game over popup-->
		<div id="gameover">
            <div id="heading">Game Over</div>
			<div id="scorecontent">
				<div id="scoreheading">Score</div>
                <!--Temp score values are hard coded until scores system is working-->
				<div id="score"></div>
				<div id="bestscore">Personal Best: 6813</div>
			</div>
			<div id="gameoverbuttons">
				<button id="mainmenu"></button>
            	<button id="retrybutton" onclick="location.reload();">Retry</button>
			</div>     
		</div>
		
		<div id="instructions">
            <div id="heading">Instructions</div>
			<div id="instructioncontent">
				<div id="howto1">Play back the notes</div>
				<div id="howto2">shown on the</div>
				<div id="howto3">score.</div>
			</div>
			<div id="button">
            	<button id="confirmbutton" onclick="instructDismiss();">Okay!</button>
			</div>     
		</div>
        

    </body>
</html>