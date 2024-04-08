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
},false);

function renderDescription(text){
    book = JSON.parse(text);
    console.log(book);
    var title = document.getElementsByClassName('title');
    for(element of title){
        element.appendChild(document.createTextNode(book.title));
    }
    
    var cover = document.getElementById("cover");
    cover.alt = "Cover of "+book['title'];
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
    if(book["availableCopies"]> 0){
        var req = new XMLHttpRequest()
        var url = window.location.href+"/reserve";
        req.open("GET",url,true);
        req.onreadystatechange(function() {
            if (this.readyState == 4 && this.status == 200) {
                reserveBook(this.responseText);
            };
        })
    }
    else{
        alert("Unfortunately there are no longer any copies of this book available.");
    }
}
function renderButton(){
    if (reserved){
        document.getElementById('unreserve').style.display = 'block';
    }
    else{
        document.getElementById('reserve').style.display = 'block';
    }
}
function reservedBook(text){
    if(text){
        book['availableCopies'] -= 1;
        var availableCopies = document.getElementById('availableCopies');
        availableCopies.lastChild.textContent = book['availableCopies'];
        reserved= true;
    }
    else{
        alert("Unfortunately there are no longer any copies of this book available.")
    }
}
function unreservedBook(){
    book['availableCopies'] -= 1;
    var availableCopies = document.getElementById('availableCopies');
    availableCopies.lastChild.textContent = book['availableCopies'];
    reserved= false;

}