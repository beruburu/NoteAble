<?php
        $servername = "mysql9.000webhost.com";
        $username = "a1777619_ntbl";
        $password = "n0t3worthy";
        $dbname = "a1777619_scores";
    
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        

        //check if there already is an account for this email
        $sql = "SELECT ID FROM Login";
        $sql .= " WHERE Email='". $_GET['Email'] . "'";
        $sql .= " LIMIT 1";
        
        $id = 0;

        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row['ID'];
            }
        }


        if ($id === 0) { //create a new account
            $sql = "INSERT INTO Login(Name, Email, Password, Unlock1, Unlock2, Unlock3)VALUES(";
            $sql .= "'" . $_GET['Name'] . "'";
            $sql .= ", '" . $_GET['Email'] . "'";
            $sql .= ", '" . $_GET['Password'] . "'";
            $sql .= ", '0'";
            $sql .= ", '0'";
            $sql .= ", '0')";

            if ($conn->query($sql) === TRUE) {
                
                //select the id of the latest version
                $sql = "SELECT ID FROM Login";
                $sql .= " WHERE Email='". $_GET['Email'] . "'";
                $sql .= " LIMIT 1";
        
                $id = 0;

                $result=$conn->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $id = $row['ID'];
                    }
                }

                echo $id . "{";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

        } else {
            //account with this email already exists
            echo "INVALID{";
        }


?>