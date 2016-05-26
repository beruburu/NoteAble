<?php

session_start();

if (isset($_SESSION['ID'])) {    
        echo $_SESSION['ID'] . "{" . $_SESSION['Name'] . "{" . $_SESSION['Theme'] . "{" . $_SESSION['Sound'] . "{";
        echo $_SESSION['Unlock1'] . "{" . $_SESSION['Unlock2'] . "{" . $_SESSION['Unlock3'] . "{";
} else {
        echo "0{0{0{0{";
        echo "0{0{0{";
}
?>