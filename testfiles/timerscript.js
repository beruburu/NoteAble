    var h1 = document.getElementsByTagName('h1')[0];
    var seconds = 0;
    var minutes = 1;
    var t;

    function add() {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
            }

        }

        h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "0") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    }

    function timer() {
        if (seconds>0 || minutes>0) {
            t = setTimeout(add, 1000); 
        } 
    }

    timer();

   