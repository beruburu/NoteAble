<?php
    session_start();

	$score = $_GET['score'];

    //return best score from the DB -- stored in a session variable -- if available
    if (isset($_SESSION['BestScore'])) { 
        echo (($score < $_SESSION['BestScore']) ? $_SESSION['BestScore'] : $score);
    } else {
        //use cookies if the user is not logged in
	    setcookie("score", $score, 0, "/");
	    if ($_COOKIE['bestscore'] < $score) {
		    setcookie("bestscore", $score, 0, "/");
		    $_COOKIE['bestscore'] = $score;
		    echo $score;
	    } else {
		    $bestscore = $_COOKIE['bestscore'];
		    echo $bestscore;
	    }    
    }

?>