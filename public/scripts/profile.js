// This is the script of the profile page that renders the profile information using ajax and has a release option for currently reservated books.


window.addEventListener("load",function(){
    var req = new XMLHttpRequest();
    var url = "/users";
    req.open("GET", url,true);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderProfile(this.responseText);
      };
    }
    req.send();
    
},true)

// this function reders the profile by being given a user object in json string format:
async function renderProfile(text){
    const userObj = await JSON.parse(text);
    
    var userName = document.getElementById("username");
    userName.appendChild(document.createTextNode(userObj.username));
    
    var fullName = document.getElementById("fullname");
    fullName.appendChild(document.createTextNode(userObj.name));

    var emailAddress = document.getElementById("email");
    emailAddress.appendChild(document.createTextNode(userObj.email));

    var address = document.getElementById("address");
    address.appendChild(document.createTextNode(userObj.address));

    console.log(userObj);
    var history = document.getElementById("history");
    renderHistory(userObj.reservationHistory,history);

    var current = document.getElementById("current");
    renderHistory(userObj.currentReservation,current);
}

//This function renders the history of the user:
async function renderHistory(history,section){
    var req = new XMLHttpRequest();
    var url = "/users/books";
    req.open("POST", url,true);
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            var books = await JSON.parse(this.responseText);
            for(var book of books){
                var link = document.createElement('a');
                link.href = "/books/description/"+book.id;
                link.appendChild(document.createTextNode(book.title));
                
                var p = document.createElement('p');
                section.appendChild(p);
                p.appendChild(link);
                if (section.id == 'current'){
                    p.id = "book"+book.id;
                    var button = document.createElement('BUTTON');
                    button.appendChild(document.createTextNode("Release"));
                    button.onclick = function() {release(book.id)};
                    p.appendChild(button);
                }
            }
      };
    }
    var requestData = JSON.stringify({ history: history });
    req.send(requestData);
}

// this function handles the release logic of the currently reserved book buttons:
async function release(id){
    var req = new XMLHttpRequest();
    var url = "/books/description/"+id+"/release";

    req.open("GET",url,true)
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var section = document.getElementById("current");
            var p = document.getElementById("book"+id);
            console.log(p);
            section.removeChild(p);
        }
    }
    req.send();

}