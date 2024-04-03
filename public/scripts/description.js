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

    //book = JSON.parse(text)
    var title = document.getElementsByClassName('title');
    for(element of title){
        element.appendChild(document.createTextNode("The Circle"));
    }
    
    var cover = document.getElementById("cover");
    cover.src = "https://upload.wikimedia.org/wikipedia/en/2/28/The_Circle_%28Dave_Eggers_novel_-_cover_art%29.jpg?20140811060221"
    cover.alt = "Cover of The Circle";
    //cover.alt = "Cover of "+book['title'];
    //cover.src = book['cover']
    var author = document.getElementById("author");
    author.appendChild(document.createTextNode('David Eggers'));
    //author.append(document.createTextNode(book['author']));

    var genre = document.getElementById("genre");
    genre.appendChild(document.createTextNode("Thriller"));
    //genre.append(document.createTextNode(book['genre']));
    
    var publisher = document.getElementById("publisher");
    publisher.appendChild(document.createTextNode("Knopf"));
    //publisher.append(document.createTextNode(book['publisher']));
    
    var yearOfPublishing = document.getElementById("yearOfPublishing");
    //yearOfPublishing.append(document.createTextNode(book["yearOfPublishing"]));
    yearOfPublishing.appendChild(document.createTextNode('1993'));
    
    var availableCopies = document.getElementById("availableCopies");
    //availableCopies.append(document.createTextNode(book['availableCopies']));
    availableCopies.appendChild(document.createTextNode("0"));

    var plot = document.getElementById('plot');
    //plot.appendChild(document.createTextNode(book['plot']))
    plot.appendChild(document.createTextNode("\"The Circle,\" is a gripping tale set in a near-future Silicon Valley, where the power and influence of technology corporations reign supreme. The narrative revolves around Mae Holland, a young and ambitious woman who secures a coveted position at The Circle, a fictional tech company reminiscent of Google or Facebook. As Mae delves deeper into her role, she becomes increasingly enmeshed in the company's culture of transparency and surveillance, blurring the lines between her professional and personal life. Eggers skillfully navigates themes of privacy, ethics, and the consequences of unchecked technological advancement, offering readers a thought-provoking exploration of the perils of a hyper-connected world."));
    renderButton();
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