<?php

	$score = $_GET['score'];
	setcookie("score", $score, 0, "/");

	if ($_COOKIE['bestscore'] < $score) {
		setcookie("bestscore", $score, 0, "/");
		$_COOKIE['bestscore'] = $score;
		echo $score;
	} else {
		$bestscore = $_COOKIE['bestscore'];
		echo $bestscore;
	}

?>