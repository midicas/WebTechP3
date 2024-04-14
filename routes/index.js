// The main router for the index/catalogue page and the description page. It contains all the routers grouped together.

var express = require('express');
var router = express.Router();
const user = require("../objects/user");
const book = require("../objects/book");

// Get the home page:
router.get('/',function(req,res,next){
  res.render("index",{pageTitle:"Catalogue"});
});

// Get the book objects for the pagination:
router.get('/books/:start/:range',async function(req,res,next){
  //Fetch Books from database
  var start = parseInt(req.params.start);
  var range = parseInt(req.params.range);
  const values = Array.from({ length: range }, (_, i) => start + i);
  try {
    const bookObj = await book.fetch(values);
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

// Get the book description page:
router.get("/books/description/:bookID",(req,res,next)=>{
  res.render('description',{pageTitle:"Description"});
});

// Get the book description for rendering on the website.
router.get('/books/description/:bookID/get', async function(req, res, next) {
  try {
      const bookID = req.params.bookID;
      const bookObj = await book.fetch([parseInt(bookID)]); // Pass the same ID for both start and end

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

// Get the book check information (reserve or release) 
router.get('/books/description/:bookID/check',async function(req,res,next){
  if (req.session && req.session.user) {
    try {
        // Fetch user object based on session user ID
        const userObj = await user.fetch(req.session.user);
        // Check if the book ID exists in user's current reservations
        const bookID = parseInt(req.params.bookID);
        const isReserved = userObj.currentReservation.includes(bookID);
        
        if (isReserved) {
            res.send("release"); // Send "release" if the book is reserved
        } else {
            res.send("reserve"); // Send "reserve" if the book is not reserved
        }
    } catch (error) {
        console.error("Error occurred while checking reservation:", error);
        res.status(500).send("Error occurred while checking reservation"); // Handle errors gracefully
    }
} else {
    // Session or user not available, redirect or handle as appropriate
    res.send("reserve");
}
});

// Reserve and get the reservation feedbackstatus:
router.get('/books/description/:bookID/reserve',async function(req,res,next){
  //Update user data
  //Connect to database for users and book
  //Add to reservation history of user
  //Subtract from available copies from book.
  
  if (req.session && req.session.user) { 

    let bookID = parseInt(req.params.bookID);
    let bookObj = (await book.fetch([bookID]))[0];
    let userObj = await user.fetch(req.session.user);

    if (!userObj.currentReservation.includes(bookObj.id) && bookObj.availableCopies > 0){
      
      await bookObj.reserve();
      await userObj.reserve(bookID)
      res.send((bookObj.availableCopies).toString());
      }
    
    else{
      res.send("Not Available");
    }
  }
  else{
    res.send('redirect');
  }
});

// Release and get the release feedbackstatus:
router.get('/books/description/:bookID/release',async function(req,res,next){
  //Update user data
  //Connect to database for users and book
  //Add to reservation history of user
  //Subtract from available copies from book.
  if (req.session && req.session.user) { 

    let bookID = parseInt(req.params.bookID);
    let bookObj = (await book.fetch([bookID]))[0];
    
      await bookObj.release();
      let userObj = await user.fetch(req.session.user);
      await userObj.release(bookID);
      res.send((bookObj.availableCopies).toString());
  }
  else{
    res.send('redirect');
  }
});

module.exports = router;
