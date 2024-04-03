// This file is used to initialize a books/user database
const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 
const user = require("../objects/user");

// create the book/user database
var db = new sqlite3.Database("database/books.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("connection successful");
})

// create a table for the books to reside in :>
let tableStatement = "CREATE TABLE books (ID, TITLE, AUTHOR, DESCRIPTION, YEAR, AVAILABLECOPIES)";
db.run(tableStatement, (err) => {
    if (err){
        console.error(err.message);
    }
});
console.log("table created")

// create a table for the users
tableStatement = "CREATE TABLE users (ID, NAME, EMAIL, USERNAME, PASSWORD, ADDRESS)";
db.run(tableStatement, (err) => {
    if (err){
        console.error(err.message);
    }
});

// add all starting books to database
booksArray = [
    new book("test","test","test","test","test",1)
];

for (bookie of booksArray){
    bookie.addToDB();
}

// add test user to db
testUser = new user(1,"john", "test@yeehaw.com", "johnatron", "password", "1234 negro arroya lane NM");
testUser.addToDB();

function selectRows() {
    db.each('SELECT username FROM users', (error, row) => {
      if (error) {
        throw new Error(error.message);
      }
      console.log(row);
    });
  };
selectRows(); 

db.close();
