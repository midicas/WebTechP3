var book;
var reserved = false;
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
    console.log(button);
    req = new XMLHttpRequest();
    url = window.location.href+"/check";
    req.open("GET",url,true);
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
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
    req.send();
    
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
                reserveBook();
            };
        }
        req.send();
    }
    else{
        alert("Unfortunately there are no longer any copies of this book available.");
    }
}
function reserveBook(response){
    if(response){
        console.log(response);
    }
    else{
        alert("Something went wrong.");
    } 
}