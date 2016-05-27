# NoteAble
Updated 2016-05-26

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
note is associated with a note on a musical staff. Each stage has two levels of difficulty. Level 1
displays shapes or letters on the keyboard and uses simpler scales (C Major and A Minor) to generate the
note sequences; Level 2 has blank keys and uses more complex scales (C# Major and A# Minor). 

NoteAble uses AJAX and PHP to communicate with a mySQL database hosted by 000webhost.com. 
For full functionality, the game should be tested at the following URL: 
http://www.noteable.comxa.com/sprint3/


03. SPRINT 3 CHALLENGE: UNLOCKABLES
    i.  Achieving Unlockables
        If a user has logged in, every time they reach the Game Over status, their final score will be added to a 
        cumulative score in the database. When the reach the required score, they will be notified at game over
        that one of the unlockables is now available.

   ii. List of Unlockables
        1. Free Mode -- 1000 Points
            If this has been unlocked, the "Locked" button on the main menu will link to "Free Mode". 
            Free Mode allows the user to play the keyboard without gaining points or following a sequence.

        2. Keyboard Sounds -- 1500 Points
            If this has been unlocked, the "Keyboard Sounds" radio buttons on the Settings slideout screen 
            will be available. The user will have the option to select Harpsichord or Synth sounds instead of 
            the default Piano sounds for the game screen.

        3. Keyboard Style -- 2000 Points
            If this has been unlocked, the "Keyboard Style" radio buttons on the Settings screen will be available.
            Selecting the "Classic" or "Retro" options will change the style of the keyboard and notes
            on the game screen.

   iii. Accessing Unlockables
        Once Free Mode has been unlocked, it will be accessible from a button on Main Menu screen (mainmenu.html). 
        Keyboard Sounds and Keyboard Style can be accessed by the Settings slide screen, which is accessed by
        pressing the cog symbol in the upper right corner of the Main Menu. After selecting your desired options,
        press the apply button and the settings will affect the next game.      


04. CODE STRUCTURE
    i.  HTML files
        index.html is the landing page showing a graphic and linking to the main menu.

        mainmenu.html is the main menu allowing the user to select a stage and level or view the high scores. The
        main menu also allows the user to sign up, login,  change their theme or sound for the keyboard (if
        unlocked), and access the free mode (if unlocked). 
        
        game.html is the gameplay page for all stages and levels of the game. The stage and level are 
        set as part of the URL query string by mainmenu.html.  

    ii. /js directory

        game.js includes all gameplay script (for game.html). 
        The functions getHighScores(), checkHighScore() and submitScore() communicate with the php files
        gethighscores.php and updatescore.php, respectively. 

        loading.js contains script for the loading animation on the game page (game.html).

        menuslideout.js contains script for the menu slide-out screen on the game page (accessible from
        the icon in the upper left corner).

        imageMapResizer.min.js is by David D. Bradshaw (http://davidjbradshaw.com/imagemap-resizer/example/).
        It is used on game.html to make the image map responsive when resizing the screen. 

        mainmenu.js includes all script (button animations and links) from the main menu (mainmenu.html).

        settingsslideout.js includes script for the settings slide-out screen on the main menu page (accessible from
        the icon in the upper right corner).

        fullscreen.js includes script for setting the game to full screen mode. 
        
        /howler directory
        Howler.js (howlerjs.com) is used to play all sounds on the game screen. This library is used in NoteAble 
        because standard HTML5/JS audio can only be played on mobile browsers for user-generated events. Howler.js
        has a workaround for this functionality. 


    iii./style directory
        style.css contains a CSS reset (from http://meyerweb.com/eric/tools/css/reset/) that applies to all pages.

        game.css contains the CSS for game.html.

        landing.css and mainmenu.css contain CSS for the landing page and main menu respectively. 

        popupsgame.css and menuslideout.css contains CSS for the popups of the game and menu pages respectively. 

        fullscreen.css contains CSS styling for the game in full screen mode. 

        menuslideout.css and settingsslideout.css contain styling for the slideout menu (on the game page)
        and the slideout settings (on the main menu page) respectively. 


    iv. /php directory
        gethighscores.php contains a SELECT statement to get the top high scores from the database to either
        load the high scores popup or determine the user's place.

        updatescore.php contains an INSERT statement to add the user to the high scores database. 

        getlogin.php returns session variables with login information. 

        login.php checks if the user exists in the database and sets session variables to log them in if appropriate.

        logout.php logs out the users by resetting all session variables.

        score.php returns either the user's highest score in a session variable (if the user is logged in), 
        or the highest score in a local cookie (if they are not). 

        signup.php contains an INSERT statement for a user to create an account in the database. 

        updatesettings.php updates the user's preferred theme and sound (if unlocked).

        updateuservalues.php fires on game over and updates the user's highest score, cumulative score, and 
        whatever unlockables they have achieved. 
    
    v.  /images directory
        Contains all game images. "classic" and "retro" subdirectories contain images for the alternate themes
        for unlockable #3. 
        
    vi. /sounds directory
        Contains all game sounds. "harpsichord" and "moog" subdirectories contain sound for the alternate sound
        options for unlockable #2. The "sheep" subdirectory contains pitched sheep sounds for the easter egg. 


05. TECHNOLOGIES USED
- HTML/CSS
- Javascript (including Howler.js javascript library), JQuery, AJAX
- PHP
- MySQL

06. ISSUES
   i.   NoteAble does not work on Internet Explorer. Chrome and Firefox are recommended for best performance.