<?php
        
        session_start();

        //update session variables
        $_SESSION['Theme'] = $_GET['Theme'];
        $_SESSION['Sound'] = $_GET['Sound'];

        $servername = "mysql9.000webhost.com";
        $username = "a1777619_ntbl";
        $password = "n0t3worthy";
        $dbname = "a1777619_scores";
    
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }




        //update session values into the database
        $sql = "UPDATE Login SET Theme=" . $_SESSION['Theme'];
        $sql .= ", Sound=" . $_SESSION['Sound'];
        $sql .= " WHERE ID=" . $_SESSION['ID'] . ";";
        

        if ($conn->query($sql) === TRUE) {
            echo "Success";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }


        $conn->close();
?>
