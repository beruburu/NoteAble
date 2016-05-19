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

        $highscores = ""; 
        $rownum = 0; 

        $scoreposition = -1;
         

        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $name = $row['Name'];
                $score = $row['Score'];

                //$highscores[$rownum] = array($name, $score);

                $highscores .=  $name . "}" . $score . "{";

                if (isset($_GET['Score']) && $score < $_GET['Score'] && $scoreposition == -1) {

                    $scoreposition = $rownum; 
                }

                $rownum++;

            }
        }

        if (isset($_GET['Score'])) {
            echo $scoreposition; 
        } else {
            echo $highscores; 
        }

?>