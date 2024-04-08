var express = require('express');
var router = express.Router();
const user = require("../objects/user");
const book = require("../objects/book");

var start = 0;
var range = 10;
var bookObj;
var userObj;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index",{pageTitle:"Catalogue"})
});
//Pagination route
router.get('/books/further', (req,res,next) =>{
  start = start + range;
  res.redirect('/');
})
router.get('/books/back',(req,res,next) =>{
  start = Math.max(0,start-range);
  res.redirect('/')
})
router.get("/books/description/:bookID",(req,res,next)=>{
  res.render('description',{pageTitle:"Description"});
})
router.get('/books',async function(req,res,next){
  //Fetch Books from database
  try {
    const bookObj = await book.fetch(start,start+range-1);

    if (bookObj) {
        res.send(bookObj);
    } else {
        res.status(404).send("Book not found");
    }
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

router.get('/books/description/:bookID/get', async function(req, res, next) {
  try {
      const bookID = req.params.bookID;
      const bookObj = await book.fetch(parseInt(bookID), parseInt(bookID)); // Pass the same ID for both start and end

      if (bookObj) {
          console.log(bookObj);
          res.send(bookObj[0]);
      } else {
          res.status(404).send("Book not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, continue to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect('/users/login');
}

router.get('/description/:bookID/reserve', isLoggedIn,async function(req,res,next){
  //Update user data
  //Connect to database for users and book
  //Add to reservation history of user
  //Subtract from available copies from book.
  bookObj = await book.fetch(req.params.bookID,req.params.bookID);
  if (bookObj.availableCopies > 0){
    await bookObj.reserve();
    userObj = await book.fetch(req.session.user);
    await userObj.reserve(bookObj.title);
    res.send(bookObj.availableCopies);
    }
  else{
    res.send("");
  }
});

module.exports = router;
