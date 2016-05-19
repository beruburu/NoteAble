var score = 800; //test value 

checkHighScore(); 

function getHighScores() {
    alert("TEST");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
    };

    xmlhttp.open("GET", "gethighscores.php", true);
    xmlhttp.send();
}

function checkHighScore() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var position = parseInt(xmlhttp.responseText.charAt(0));
            if (position >= 0) {
                var heading;
                switch (position) {
                    case 0:
                        heading = "You placed first!";
                        break;
                    case 1:
                        heading = "You placed second!";
                        break;
                    case 2:
                        heading = "You placed third!";
                        break;
                    case 3:
                        heading = "You placed fourth!";
                        break;
                    case 4:
                        heading = "You placed fifth!";
                        break;
                }
                document.getElementById("position").innerHTML = heading;
            } else {
                showHighScores();
            }
        }
    };
        
    xmlhttp.open("GET", "gethighscores.php?Score=" + score, true);
    xmlhttp.send();
}

function getHighScores() {
    
}

function submitScore() {
    if (validateName()) {
        var name = document.getElementById("enterinitials").value;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                showHighScores(); 
            }
        };

        xmlhttp.open("GET", "updatescore.php?Name=" + name + "&Score=" + score, true);
        xmlhttp.send();
    }
}

function validateName() {
    return true; 
}

function showHighScores() {
}