
		var keys = [];
		keys[0] = new Audio();
		keys[0].src = "sounds/C.wav";
		keys[1] = new Audio();
		keys[1].src = "sounds/CSharp.wav";
		keys[2] = new Audio();
		keys[2].src = "sounds/D.wav";
		keys[3] = new Audio();
		keys[3].src = "sounds/DSharp.wav";
		keys[4] = new Audio();
		keys[4].src = "sounds/E.wav";
		keys[5] = new Audio();
		keys[5].src = "sounds/F.wav";
		keys[6] = new Audio();
		keys[6].src = "sounds/FSharp.wav";
		keys[7] = new Audio();
		keys[7].src = "sounds/G.wav";
		keys[8] = new Audio();
		keys[8].src = "sounds/GSharp.wav";
		keys[9] = new Audio();
		keys[9].src = "sounds/A.wav";
		keys[10] = new Audio();
		keys[10].src = "sounds/ASharp.wav";
		keys[11] = new Audio();
		keys[11].src = "sounds/B.wav";

		
		var length = trackLength(1);
		var i = 0;
		var track = [];
		//var keysPressed = [];
		var correct = false;

		function trackLength(level) {
			var length = 0;
			switch (level) {
			case 1:
				length = 5;
				break;
			case 2:
				length = 6;
				break;
			case 3:
				length = 7;
				break;
			case 4:
				length = 8;
				break;
			case 5:
				length = 9;
				break;
			case 6:
				length = 10;
				break;
			default: 
				length = 5;
			}
			return length;
		}

		function createTrack() {
			var position;
			i++;
			if(i < length) {
				position = Math.floor((Math.random() * 11) + 0);
				keys[position].addEventListener("ended", createTrack); 
				track.push(keys[position]);	
				keysPressed.push(keys[position]);			
				keys[position].play();	
			}
		}

		function playTrack() {
			createTrack();
			i = 0;
		}

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

		function confirmCorrect() {
			playTrack();
			if (isCorrect) {
				document.getElementById("correct").innerHTML = "That is correct.";
			} else {
				document.getElementById("correct").innerHTML = "That is not correct.";
			}
		}
