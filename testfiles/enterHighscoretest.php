<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Enter High Score Test</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="../style/style.css">
		<link rel="stylesheet" type="text/css" href="../style/enterhighscorespopup.css">
	</head>
	<body>
		<div id="enterhighscore">
            <form action="enterHighscoretest.php" method="post">
                <div id="heading"><h1>You Placed First!</h1></div>
			    <div id="enterhighscorecontent">
				    <div id="initialsheading">Enter Your Initials</div>
				    <div id="initials">
					    <input type="text" name="initials" id="enterinitials" maxlength="3"></input>
				    </div>
			    </div>
			    <div id="enterhighscorebuttons">
				    <div id="button">
            		    <input type="submit" id="submithighscore" value="Submit">
				    </div>
			    </div>
            </form>     
		</div>
	</body>
</html>