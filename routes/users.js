var express = require('express');
var bcrypt = require("bcrypt");
var router = express.Router();
const user = require("../objects/user");
const book = require("../objects/book"); 


function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, continue to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect('/users/login');
}
/* GET users listing. */
router.get('/', isLoggedIn, async function(req, res, next) {
  const userObj = await user.fetch(req.session.user);

  res.send(userObj);
});
//Render profile page
router.get('/profile', isLoggedIn, (req, res) => {
  //TODO: Give user through req.session.userName.
  res.render('profile',{pageTitle:"Profile Page"});
});

router.post("/books",async (req,res) =>{
  try {
    // Extract the history list from the request body
    const { history } = req.body;
    var books = await book.fetch(history);
    var resData = history.map(id => ({ id: id, title: books.find(book => book.id === id).title }));
    console.log(resData);

    res.send(resData);
} 
catch (error) {
    console.error("Error processing history:", error);
    res.status(500).send("Internal Server Error");
}
})



// User Login functionality:
router.get('/login', function(req, res) {
  res.render('login', {pageTitle : 'Login'});
});

router.post('/authenticate', async function(req, res) {
    let userName = req.body.username;
    let passWord = req.body.password;
    let IsMatch = false;
    // fetch user object from database based on username:
    let userObj = await user.fetch(userName);
    
    if (userObj !== null){
      // Compare the sent password with the hash in the user object
      IsMatch = await bcrypt.compare(passWord, userObj.password);
    }
      

    // If not return an error message telling the user that either the username or password is wrong
    if (!IsMatch){ //if username not found or password incorrect
      res.status(401).send("Not authorized, wrong username or password!");
    }

    else{
      //load the username in the req.session.user
      req.session.user = userObj.username;
      res.end();
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
  let hashPW = await bcrypt.hash(passWord, 13);
  userObj = new user(firstName + " " + lastName, emailAddress, userName, hashPW, address);


  // If creating an object failed send a status back. TODO

  // else add the user to the db and add userID to the session directly.
  await userObj.addToDB();

  req.session.user = userName;
  res.end();
});

module.exports = router;
