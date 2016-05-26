    function fullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }

    }

    var iframe = document.getElementById("iframe");
    var container = document.getElementById("container");

    function activate(elem) {
        container.style.display = "none";
        iframe.style.display = "inline";
        setTimeout(fullScreen(elem), 1000);
    }
