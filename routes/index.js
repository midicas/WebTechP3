var express = require('express');
var router = express.Router();
const user = require("../objects/user");
const book = require("../objects/book");

/* GET home page. */
router.get('/',function(req,res,next){
  res.render("index",{pageTitle:"Catalogue"});
});

//Pagination route
router.get("/books/description/:bookID",(req,res,next)=>{
  res.render('description',{pageTitle:"Description"});
});

router.get('/books/:start/:range',async function(req,res,next){
  //Fetch Books from database
  var start = parseInt(req.params.start);
  var range = parseInt(req.params.range);
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
          res.send(bookObj[0]);
      } else {
          res.status(404).send("Book not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

router.get('/books/description/:bookID/check',async function(req,res,next){
  if (req.session && req.session.user){
    const userObj = await user.fetch(req.session.user);
    if (req.params.bookID in userObj.currentReservation){
      res.send('release');
    }
  }
  res.send("reserve");
});


router.get('/books/description/:bookID/reserve',async function(req,res,next){
  //Update user data
  //Connect to database for users and book
  //Add to reservation history of user
  //Subtract from available copies from book.

  if (req.session && req.session.user) { 

    let bookID = parseInt(req.params.bookID);
    let books = await book.fetch(bookID,bookID);
    let bookObj = books[0];

    if (bookObj.availableCopies > 0){
      await book.reserve(bookID);
      await user.reserve(bookID,req.session.user);
      res.send((bookObj.availableCopies - 1).toString());
      }
    
    else{
      res.send("Not Available");
    }
  }
  else{
    res.send('redirect');
  }
});

module.exports = router;
