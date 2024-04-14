// This script is the nav script that handles the opening and closing of the navmenu when in mobile:

function navMenuClickHandler() {
    var x = document.getElementsByTagName("nav")[0];
    if (x.className === "nav--menu-closed") {
        x.className = "nav--menu-open";
    } else {
        x.className = "nav--menu-closed";
    }
    }
    
    