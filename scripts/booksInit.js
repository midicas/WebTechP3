// This file is used to initialize a books/user database

const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 

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

// add all starting books to database
booksArray = [
    new book("test","test","test","test","test",1)
];

for (bookie of booksArray){
    bookie.addToDB();
}

db.close();
