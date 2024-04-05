var express = require('express');
var bcrypt = require("bcrypt");
var router = express.Router();
const user = require("../objects/user"); 


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

router.post('/authenticate', async function(req, res) {
    const testPassword = "hoihoi";
    let userName = req.body.username;
    let passWord = req.body.password;
    let IsMatch = false;

    // fetch user object from database based on username:
    let userObj = await user.fetch(userName);
    console.log(userObj);
    if (userObj !== null){
      // Compare the sent password with the hash in the user object
      IsMatch = (userObj.password == passWord);
      //IsMatch = await bcrypt.compare(Password, user.password);
    }
      

    // If not return an error message telling the user that either the username or password is wrong
    if (!IsMatch){ //if username not found or password incorrect
      res.status(401).send("Not authorized, wrong username or password!");
    }

    else{
      //TODO should load the userID in the req.session.username
      req.session.user = userObj.username;
      res.send(userName + " " + passWord); //TODO remove;
    }
});


// User registry functionality:
router.get('/signup', function(req, res) {
  res.render('signup', {pageTitle : 'Signup'});
});

router.post('/signup', async function(req, res) {
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let emailAddress = req.body.email;
  let address = req.body.address;
  let userName = req.body.username;
  let passWord = req.body.password;

  //Try to make a user object from the information:
  userObj = new user(1, firstName + " " + lastName, emailAddress, userName, passWord, address);


  // If creating an object failed send a status back. TODO

  // else add the user to the db and add userID to the session directly.
  await userObj.addToDB();

  req.session.user = userName;
  res.end();
});

module.exports = router;
