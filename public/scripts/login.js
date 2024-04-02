var loginFailed = false;

window.addEventListener("load", function() {
    document.getElementById("login-form").addEventListener("submit", mylogin, true);
}, false);


function mylogin(e) {
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("password").value;
    // Check if all fields are filled in:
    if (userName === "" || passWord === ""){
        alert("Please fill in both the username and password!");
        
    }
    else{
        var url = 'authenticate';
        post(url, userName, passWord);
    }
    e.preventDefault();
   }



function post(url, userName, passWord){
    var req = new XMLHttpRequest();

    req.open("POST", url,true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function() {
        // Open the users page if the status is 200
        if (req.readyState === 4 && req.status === 200){
            window.open('/users', '_self');
        }

        // Empty the username and password input and add a message:
        if (req.readyState === 4 && req.status === 401){
            let userName = document.getElementById("username");
            let passWord = document.getElementById("password");
            let loginSection = document.getElementById("login-section");

            userName.value = "";
            passWord.value = "";
            
            // check if the previous login was failed already:
            if (!loginFailed){
                let p = document.createElement('p');
                p.classList.add('login-failed');
                let text = document.createTextNode("The username or password is incorrect, please try again or contact the library!");
                p.appendChild(text);
                loginSection.appendChild(p);
                loginFailed = true;
            }
        }
    }
    payLoad = JSON.stringify({
        'username' : userName,
        'password' : passWord
    });
    req.send(payLoad);
}