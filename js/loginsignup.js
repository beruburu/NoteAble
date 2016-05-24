function register() {

    var email = document.getElementById("enterregisteremail").value;
    var password = document.getElementById("enterregisterpassword").value;
    var name = email.substring(0, 3);

     
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            alert(result);
        }
    };
    xmlhttp.open("GET", "php/signup.php?Email=" + email + "&Password=" + password + "&Name=" + name, true);
    xmlhttp.send();
}