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

router.post('/authenticate', function(req, res) {
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
      req.session.user = "lol";
      res.send(userName + " " + passWord);
      
    }
});


// User registry functionality:
router.get('/signup', function(req, res) {
  res.render('signup', {pageTitle : 'Signup'});
});

router.post('/signup', async function(req, res) {
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let emailAdress = req.body.email;
  let adress = req.body.adress;
  let userName = req.body.username;
  let passWord = req.body.password;

  
});

module.exports = router;
