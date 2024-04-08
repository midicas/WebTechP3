var books;

window.addEventListener("load",function(){

    var req = new XMLHttpRequest();
    var url = window.location.href+"books";
    req.open("GET",url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderCatalogue(this.responseText)
      };
    }
    req.send();
},false);


function pagination(text){
    var main = document.getElementsByTagName('main')
    main.textContent = "";

    var req = new XMLHttpRequest();
    var url = window.location.href+"books/"+text;
    req.open("GET",url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderCatalogue(this.responseText)
      };
    }
    req.send();
}
function renderCatalogue(text){
    var books = JSON.parse(text)
    var main = document.getElementsByTagName('main')[0];
    var list = document.createElement('ul');

    main.appendChild(list);
    for(var book of books){
        console.log(book);
        var listItem = document.createElement('li');
        listItem.id = 'book'+book.id;
        
        var section = document.createElement('SECTION');
        var coverImage = document.createElement("IMG");
        coverImage.src = book.url;
        coverImage.alt = 'Cover of ' + book.url;
        
        listItem.appendChild(coverImage);
        listItem.appendChild(section);

        var title = document.createElement("H1");
        var plot = document.createElement('p');
        title.appendChild(document.createTextNode(book.title));
        plot.appendChild(document.createTextNode(book.description));

        section.appendChild(title);
        section.appendChild(plot);

        list.appendChild(listItem);
    }

}

function addLink(id){
    var li = document.getElementById('book'+id);
    li.addEventListener('click',function(){
        window.location.href = window.location.href+'description/'+id;
    },false);
}
