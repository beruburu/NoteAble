# NoteAble
Updated 2016-05-20

01. TEAM 25
Janelyn Ballena
Elisa Chu
Ariana Farkhondeh
Sophia Lindgren
Meghan Tius

02. NOTEABLE: PROJECT OVERVIEW
NoteAble is a music based memory game where users are given a sequence of notes and must
play them back on a piano keyboard. The game has three stages: Novice, where each note is associated
with a shape; Intermediate, where each note is associated with a letter; and Advanced, where each
note is associated with a note on a musical staff. Each stage has two levels of difficulty. 
Currently, only Novice and Intermediate stages with the first level of difficulty are available. 

NoteAble uses AJAX and PHP to communicate with a mySQL database hosted by 000webhost.com. 
For full functionality, the game should be tested at the following URL: 
http://www.noteable.comxa.com


03. CODE STRUCTURE
    i.  HTML files
        index.html is the landing page showing a graphic and linking to the main menu.
        mainmenu.html is the main menu allowing the user to select a stage and level or view the high scores.
        game.html is the gameplay page for all stages and levels of the game. The stage and level are 
        set as part of the URL query string by mainmenu.html.  

    ii. /js directory
        game.js includes all gameplay script (for game.html). 
        The functions getHighScores(), checkHighScore() and submitScore() communicate with the php files
        gethighscores.php and updatescore.php, respectively. 

        mainmenu.js includes all script (button animations and links) from the main menu (mainmenu.html).

    iii./style directory
        style.css is a CSS reset that applies to all pages.
        game.css contains the CSS for game.html.
        enterhighscorespopup.css, gameoverpopup.css, highscorespopup.css, and instructionpopup.css contain
        CSS for specific popups on the game page.
        landing.css and mainmenu.css contain CSS for the landing page and main menu respectively. 

    iv. /php directory
        gethighscores.php contains a SELECT statement to get the top high scores from the database to either
        load the high scores popup or determine the user's place.
        updatescore.php contains an INSERT statement to add the user to the high scores database. 


04. TECHNOLOGIES USED
- HTML/CSS
- Javascript, JQuery, AJAX
- PHP
- MySQL

05. ISSUES
   i.   The image map does not always resize when resizing the screen. 
        If you are unable to click on the keys, please refresh the page.

  ii.   The game currently freezes at the initial note sequence on most mobile browsers. 
        This is a known Javascript issue with audio playback that will be fixed for the next sprint. 