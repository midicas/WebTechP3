
window.addEventListener("load",function(){

    var req = new XMLHttpRequest();
    var url = window.location.href+"/get";
    req.open("GET", url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderDescription(this.responseText)
      };
    }
    req.send();

    var button = document.getElementById("reserve");
    check = new XMLHttpRequest();
    checkUrl = window.location.href+"/check";
    check.open("GET",checkUrl,true);
    check.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if(this.responseText == 'reserve'){
                button.appendChild(document.createTextNode("Reserve"));
                button.addEventListener('click',() => reserve(),false);
            }
            else if(this.responseText == 'release'){
                button.appendChild(document.createTextNode("Release"));
                button.addEventListener('click',() => release(),false);
            }
        }
    }
    check.send();
    
},false);

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
    yearOfPublishing.append(document.createTextNode(book.yearOfPublishing));
    
    var availableCopies = document.getElementById("availableCopies");
    availableCopies.append(document.createTextNode(book.availableCopies));

    var plot = document.getElementById('plot');
    plot.appendChild(document.createTextNode(book.description));
    
}
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
            button.removeEventListener('click',() => release());
            button.addEventListener('click', () => reserve());
        }
    }
    req.send();
}
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
        button.removeEventListener('click',() => reserve());
        button.addEventListener('click', () => release());
    }
}