<!DOCTYPE html>
<?php
        $servername = "mysql9.000webhost.com";
        $username = "a1777619_ntbl";
        $password = "n0t3worthy";
        $dbname = "a1777619_scores";
    
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }


        $sql = "SELECT Name, Score FROM HighScores";
        $sql .= " ORDER BY Score DESC";
        $sql .= " LIMIT 5";

        $highscores = array(); 
        $rownum = 0; 

        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $name = $row['Name'];
                $score = $row['Score'];

                $highscores[$rownum] = array($name, $score);
                $rownum++;
            }
        }

  
?>
<html lang="en">
	<head>
		<title>Instructions Testing</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="style/style.css">
		<link rel="stylesheet" type="text/css" href="style/highscorespopup.css">
        <meta charset="utf-8" />
	</head>
	<body>
		<div id="highscores">
            <div id="heading">High Scores</div>
                    <table id="scores">
                        <tr>
                            <td>1.</td>
                            <td><?echo $highscores[0][0];?></td>
                            <td><?echo $highscores[0][1];?></td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td><?echo $highscores[1][0];?></td>
                            <td><?echo $highscores[1][1];?></td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td><?echo $highscores[2][0];?></td>
                            <td><?echo $highscores[2][1];?></td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td><?echo $highscores[3][0];?></td>
                            <td><?echo $highscores[3][1];?></td>
                        </tr> 
                        <tr>
                            <td>5.</td>
                            <td><?echo $highscores[4][0];?></td>
                            <td><?echo $highscores[4][1];?></td>
                        </tr> 
                    </table>
			<div id="button">
            	<button id="confirmbutton" onclick="instructDismiss();">Okay!</button>
			</div>     
		</div>
    </body>
</html>
