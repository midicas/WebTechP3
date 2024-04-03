var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();

var start = 1;
var range = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index",{pageTitle:"Catalogue"})
});
//Pagination route
router.get('/further', (req,res,next) =>{
  start = start + range;
  router.redirect('/');
})
router.get("/books/description",(req,res,next)=>{
  res.render('description',{pageTitle:"Description"});
})
router.post('/books/:start/:range',function(req,res,next){
  //Fetch Books from database
  //Is only called in html js
  
  //res.send(books)
});

router.post('/description/:bookID', function(req, res,next){
  //Fetch book from database
  //Is only called in html js
  res.render('description',{pageTitle:req.params.bookID});
})

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, continue to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect('/users/login');
}

router.get('/description/:bookID/reserve', isLoggedIn,function(req,res,next){
  //Update user data
  //Connect to database for users and book
  //Add to reservation history of user
  //Subtract from available copies from book.
});

module.exports = router;
