var signupFailed = false;

window.addEventListener("load", function() {
    document.getElementById("register-form").addEventListener("submit", myregister, true);
}, false);


function myregister(e) {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var emailAdress = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("password").value;


    // Check if all fields are filled in:
    if (firstName === "" || lastName === "" || emailAdress === "" || address === "" || userName === "" || passWord === ""){
        alert("Please fill in all of the fields before submitting!");
        
    }
    else{
        var url = 'signup';
        post(url, firstName, lastName, emailAdress, address, userName, passWord);
    }
    e.preventDefault();
   }



function post(url, firstName, lastName, emailAdress, address, userName, passWord){
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
        'email' : emailAdress,
        'address' : address,
        'username' : userName,
        'password' : passWord
    });
    req.send(payLoad);
}