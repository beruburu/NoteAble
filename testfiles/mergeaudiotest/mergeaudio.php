<?php
   // $myfile = fopen("test.mp3", "w")

    file_put_contents('test.mp3',
    file_get_contents('a.mp3') .
    file_get_contents('aSharp.mp3').
    file_get_contents('b.mp3'));

    //fclose($myfile);

    echo "SUCCESS";
?>