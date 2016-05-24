<?php
    
        session_start();

        $servername = "mysql9.000webhost.com";
        $username = "a1777619_ntbl";
        $password = "n0t3worthy";
        $dbname = "a1777619_scores";
    
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        //select login information
        $sql = "SELECT ID, Name, Unlock1, Unlock2, Unlock3"
        $sql .= ", Theme, Sound, BestScore, TotalScore"
        $sql .= " FROM Login";
        $sql .= " WHERE Email='". $_GET['Email'] . "'";
        $sql .= " AND Password='". $_GET['Password'] . "'";
        $sql .= " LIMIT 1";

        
        $id = 0;
        $name = "";
        $unlock1 = 0;
        $unlock2 = 0; 
        $unlock3 = 0; 
        $theme = 0; 
        $sound = 0; 
        $bestscore = 0;
        $totalscore = 0; 

        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row['ID'];
                $name = $row['Name'];
                $unlock1 = $row['Unlock1'];
                $unlock2 = $row['Unlock2'];
                $unlock3 = $row['Unlock3'];
                $theme = $row['Theme'];
                $sound = $row['Sound'];
                $bestscore = $row['BestScore'];
                $totalscore = $row['TotalScore'];

            }
        }

        //set session variables to access on the game page
        $_SESSION['ID'] = $id;
        $_SESSION['Name'] = $name;
        $_SESSION['Theme'] = $theme;
        $_SESSION['Sound'] = $sound;
        $_SESSION['BestScore'] = $bestscore;
        $_SESSION['TotalScore'] = $totalscore;


        echo $id . "{" . $name . "{" . $unlock1 . "{" . $unlock2 . "{" . $unlock3 . "{";
?>