var express = require('express');
var bcrypt = require("bcrypt");
var router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, continue to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect('/users/login');
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect("/users/profile")
});
//Render profile page
router.get('/profile', isLoggedIn, (req, res) => {
  //TODO: Give user through req.session.userName.
  res.render('profile',{pageTitle:"Profile Page"});
});

// User Login functionality:
router.get('/login', function(req, res) {
  res.render('login', {pageTitle : 'Login'});
});

router.post('/login', function(req, res) {
    const testPassword = "hoihoi";
    let userName = req.body.username;
    let passWord = req.body.password;

    // Check if username exists in the database:

    // If not return an error message telling the user that either the username or password is wrong

    // Load the user its password hash:
    //let Hashuser;

    // Compare the sent password with the hash in the database
    //const IsMatch = await bcrypt.compare(Password, Hashuser)

    // If not return an error message telling the user that either the username or password is wrong
    if (passWord !== testPassword){
      res.status(401).send("Not authorized");
    }

    else{
      //TODO should load the userID in the req.session.username
      console.log(userName + " " + passWord);
      res.send(userName + " " + passWord);
    }
});


// User registry functionality:
router.get('/register', function(req, res) {
  res.render('register', {pageTitle : 'Register'});
});

router.post('/register', async function(req, res) {
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let emailAdress = req.body.email;
  let adress = req.body.adress;
  let userName = req.body.username;
  let passWord = req.body.password;


  //TODO add functionality and not sent the results back!!!!!!!!!:
  console.log(firstName + " " + lastName + " " + emailAdress + " " + adress + " " + userName + " " + passWord);
  res.send(firstName + " " + lastName + " " + emailAdress + " " + adress + " " + userName + " " + passWord);
  
});

module.exports = router;
