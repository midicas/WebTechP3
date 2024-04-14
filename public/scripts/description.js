//This is the script for the description page which handles 
//the rendering of the description and reservation/release logic.


window.addEventListener("load",function(){
    var getReq = new XMLHttpRequest();
    var url = window.location.href+"/get";
    getReq.open("GET", url,true);
    getReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderDescription(this.responseText)
      };
    }
    getReq.send();

    var button = document.getElementById("reserve");
    var checkReq = new XMLHttpRequest();
    checkUrl = window.location.href+"/check";
    checkReq.open("GET",checkUrl,true);
    checkReq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if(this.responseText == 'reserve'){
                button.appendChild(document.createTextNode("Reserve"));
                button.addEventListener('click',reserve,false);
            }
            else if(this.responseText == 'release'){
                button.appendChild(document.createTextNode("Release"));
                button.addEventListener('click',release,false);
            }
        }
    }
    checkReq.send();
    
},false);

// This function renders the description of a book using the json string of its object:
function renderDescription(text){
    book = JSON.parse(text);
    var title = document.getElementsByClassName('title');
    for(element of title){
        element.appendChild(document.createTextNode(book.title));
    }
    
    var cover = document.getElementById("cover");
    cover.alt = "Cover of "+book.title;
    cover.src = book.url;
    
    var author = document.getElementById("author");
    author.append(document.createTextNode(book.author));

    var genre = document.getElementById("genre");
    genre.append(document.createTextNode(book.genre));
    
    var publisher = document.getElementById("publisher");
    publisher.append(document.createTextNode(book.publisher));
    
    var yearOfPublishing = document.getElementById("yearOfPublishing");
    yearOfPublishing.append(document.createTextNode(book.year));
    
    var availableCopies = document.getElementById("availableCopies");
    availableCopies.append(document.createTextNode(book.availableCopies));

    var plot = document.getElementById('plot');
    plot.appendChild(document.createTextNode(book.description));
    
}

// This function handles the reserve request to the server. Note that availability is doublechecked at the serverside too!
function reserve(){
    if(book.availableCopies > 0){
        var req = new XMLHttpRequest()
        var url = window.location.href+"/reserve";

        req.open("GET",url,true);
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                reserveBook(this.responseText);
            };
        }
        req.send();
    }
    else{
        alert("Unfortunately there are no longer any copies of this book available.");
    }
}

// This function handles the release request to the server and is an eventhandler of the button.
function release(){
    var req = new XMLHttpRequest();
    var url = window.location.href+"/release";

    req.open("GET",url,true)
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var button = document.getElementById('reserve');
            button.textContent = "";
            button.appendChild(document.createTextNode("Reserve"));
            var availableCopies = document.getElementById("availableCopies");
            availableCopies.textContent = "";
            availableCopies.appendChild(document.createTextNode(this.responseText));
            button.removeEventListener('click',release);
            button.addEventListener('click',reserve);
        }
    }
    req.send();
}

// This function handles the response of the reservation on the clients browser
function reserveBook(response){
    if (response == 'redirect'){
        window.location.href = '/users/login';
    }
    else{
        var button = document.getElementById('reserve');
        button.textContent = "";
        button.appendChild(document.createTextNode("Release"));
        var availableCopies = document.getElementById("availableCopies");
        availableCopies.textContent = "";
        availableCopies.appendChild(document.createTextNode(response));
        button.removeEventListener('click',reserve);
        button.addEventListener('click',release);
    }
}