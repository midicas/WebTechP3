var books;
var start = 1;
var range = 10;
var max = Number.MAX_SAFE_INTEGER;

window.addEventListener("load",function(){

    var req = new XMLHttpRequest();
    var url = "/books/" + start + "/" + range;
    req.open("GET",url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderCatalogue(this.responseText)
      };
    }
    req.send();

},false);


function pagination(further){
    var main = document.getElementsByTagName('main')
    main.textContent = "";
    if (further){
        if (max > range + start){
            start = range + start;
        }
        else {
            return;
        }
    }
    else{
        start = Math.max(1,start-range);
    }
    var req = new XMLHttpRequest();
    var url = "/books/" + start + "/" + range;
    req.open("GET",url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText.length == 2){
                max = start-1;
                start = start-range;
            }
            else{
            var list = document.getElementById('catalogue');
            list.textContent = "";
            var main = document.getElementsByTagName('main')[0];
            main.removeChild(list);
            window.scrollTo(0, 0);
            renderCatalogue(this.responseText);
        }
      };
    }
    req.send();
}
function renderCatalogue(text){
    var books = JSON.parse(text);
    if(books.length < range){
        max = start+books.length-1;
    }
    var buttons = document.getElementById('pagination');

    if (start == 1){
        buttons.childNodes[0].style.visibility = 'hidden';
    }
    else{
        buttons.childNodes[0].style.visibility = 'visible';
    }
    var list = document.createElement('ul');
    list.id = "catalogue";
    buttons.parentNode.insertBefore(list,buttons);
    for(var book of books){
        var listItem = document.createElement('li');
        listItem.id = 'book'+book.id;
        listItem.className = 'catalogue__item';
        var section = document.createElement('SECTION');
        section.className = 'description';
        var coverImage = document.createElement("IMG");
        coverImage.className = "cover";
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

        addLink(book.id);
    }
}

function addLink(id){
    var li = document.getElementById('book'+id);
    li.style.cursor = 'pointer';
    li.addEventListener('click',function(){
        window.location.href = 'books/description/'+id;
    },false);
}
