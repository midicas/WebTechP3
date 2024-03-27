var express = require('express');
var bcrypt = require("bcrypt")
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:userID(\\d+)', function(req, res, next) {
  res.render('profile',{ title: req.params.userID });
});

// User Login functionality:
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', async function(req, res) {
    let Username = req.body.username;
    let Password = req.body.password;

    // Check if username exists in the database:

    // If not return an error message telling the user that either the username or password is wrong

    // Load the user its password hash:
    //let Hashuser;

    // Compare the sent password with the hash in the database
    //const IsMatch = await bcrypt.compare(Password, Hashuser)

    // If not return an error message telling the user that either the username or password is wrong

    res.render('index', { title: 'to be implemented' });
});


// User registry functionality:
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', async function(req, res) {
  let Username = req.body.username;
  let Password = req.body.password;

  // Check if username already exists in the database:


  // Hash the user its password to store:
  const PasswordHash = await bcrypt.hash(Password, 13);

  // Save the user information with the hashed password to the database:


  res.render('index', { title: 'to be implemented' });
});

module.exports = router;
