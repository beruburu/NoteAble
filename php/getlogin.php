<?php

session_start();

if (isset($_SESSION['ID'])) {    
        echo $_SESSION['ID'] . "{" . $_SESSION['Name'] . "{" . $_SESSION['Theme'] . "{" . $_SESSION['Sound'] . "{";
} else {
        echo "0{0{0{0";
}
?>