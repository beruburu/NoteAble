<?php
        
        //update best score if the current score is higher
        if ($_GET['Score'] > $_SESSION['BestScore']) {
            $_SESSION['BestScore'] = $_GET['Score'];
        }

        //add current score to total score for unlockables
        $_SESSION['TotalScore'] += $_GET['Score'];

        //whether a new unlockable has been achieved
        $newunlocked = 0;

        //check if the totalscore is at the point for any new unlockables
        //only unlock one item at a time
        if  ($_SESSION['TotalScore'] >= 1000 && $_SESSION['Unlock1'] == 0) { //unlockable 1: free mode
            $_SESSION['Unlock1'] = 1
            $newunlocked = 1;
        } else if ($_SESSION['TotalScore'] >= 1500 && $_SESSION['Unlock2'] == 0) { //unlockable 2: new sounds
            $_SESSION['Unlock2'] = 1;
            $newunlocked = 2; 
        } else if ($_SESSION['TotalScore'] >= 2000 && $_SESSION['Unlock3'] == 0) {  //unlockable 3: new theme
            $_SESSION['Unlock3'] = 1;
            $newunlocked = 3;
        }

        $servername = "mysql9.000webhost.com";
        $username = "a1777619_ntbl";
        $password = "n0t3worthy";
        $dbname = "a1777619_scores";
    
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        //update session values into the database
        $sql = "UPDATE Login SET TotalScore = " + $_SESSION['TotalScore'];
        $sql .= ", BestScore = " + $_SESSION['BestScore'];
        $sql .= ", Unlock1 = " + $_SESSION['Unlock1'];
        $sql .= ", Unlock2 = " + $_SESSION['Unlock2'];
        $sql .= ", Unlock3 = " + $_SESSION['Unlock3'];
        $sql .= " WHERE ID =" + $_SESSION['ID'];
        

        if ($conn->query($sql) === TRUE) {
            echo $newunlocked + "{";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }


        $conn->close();
?>
