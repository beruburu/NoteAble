function register() {

    var email = document.getElementById("enterregisteremail").value;
    var password = document.getElementById("enterregisterpassword").value;
    var name = document.getElementById("enterregisternickname").value;


    if (email != "" && password != "" && !validateEmail(email)) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = xmlhttp.responseText
                var values = result.split("{");
                if (values[0] == "INVALID") {
                    document.getElementById("registerresponse").innerHTML = "Email already exists.";
                } else {
                    document.getElementById("registerresponse").innerHTML = "Registration complete.";
                }
            }
        };

        xmlhttp.open("GET", "php/signup.php?Email=" + email + "&Password=" + password + "&Name=" + name, true);
        xmlhttp.send();
    } else {
        document.getElementById("registerresponse").innerHTML = "Invalid email or name.";        
    }
}

function login() {
    var email = document.getElementById("enterloginemail").value;
    var password = document.getElementById("enterloginpassword").value;

    if (email != "" && password != "" && !validateEmail(email)) {
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = xmlhttp.responseText;
                var values = result.split("{");
                if (parseInt(values[0]) == 0) {
                    document.getElementById("loginresponse").innerHTML = "Invalid login.";
                } else {
                    document.getElementById("loginresponse").innerHTML = "Login successful.";
                }
            }
        };
        
        xmlhttp.open("GET", "php/login.php?Email=" + email + "&Password=" + password, true);
        xmlhttp.send();
    } else {
        document.getElementById("loginresponse").innerHTML = "Invalid login.";
    } 
    
}

//checks the email is only valid characters
function validateEmail(email) {
    return !(/[^a-zA-Z0-9@.]/.test(email));
}


//checks that high score name is only valid characters
function validateName(name) {
    return /[A-Za-z]{3}/.test(name); 
}
