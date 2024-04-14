// This script is for the signup page and handles the ajax communication between the form and the server.

var signupFailed = false;

window.addEventListener("load", function() {
    document.getElementById("register-form").addEventListener("submit", myregister, true);
}, false);

// The eventhandler function that posts the user information to the server if the fields are good.
function myregister(e) {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var emailAddress = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("password").value;

    

    // Check if all fields are filled in:
    if (firstName === "" || lastName === "" || emailAddress === "" || address === "" || userName === "" || passWord === ""){
        alert("Please fill in all of the fields before submitting!");
        
    }
    else{
        var url = 'signup';
        post(url, firstName, lastName, emailAddress, address, userName, passWord);
    }
    e.preventDefault();
    
   }


// The post function that does the actual AJAX work. When the new user is handled by the server the browser is redirected. Else the user gets a message
function post(url, firstName, lastName, emailAddress, address, userName, passWord){
    var req = new XMLHttpRequest();

    req.open("POST", url,true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function() {
        // Open the users page if the status is 200
        if (req.readyState === 4 && req.status === 200){
            window.open('/users/profile', '_self');
        }

        // Empty the username and add a message:
        if (req.readyState === 4 && req.status === 409){
            let userName = document.getElementById("username");
            let registerSection = document.getElementById("register-section");

            userName.value = "";
            
            // check if the previous login was failed already:
            if (!signupFailed){
                let p = document.createElement('p');
                p.classList.add('signup-failed');
                let text = document.createTextNode("The username is already taken, please try another one!");
                p.appendChild(text);
                registerSection.appendChild(p);
                signupFailed = true;
            }
        }
    }

    var payLoad = JSON.stringify({
        'firstname': firstName,
        'lastname' : lastName,
        'email' : emailAddress,
        'address' : address,
        'username' : userName,
        'password' : passWord
    });
    req.send(payLoad);
}