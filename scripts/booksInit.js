// This file is used to initialize a books/user database
const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 
const user = require("../objects/user");

// create the book/user database
var db = new sqlite3.Database("../database/books.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("connection successful");
})

// create a table for the books to reside in :>
let tableStatement = "CREATE TABLE books (ID, TITLE, AUTHOR, DESCRIPTION, YEAR, AVAILABLECOPIES)";
db.run(tableStatement, console.log("Books table is created!"),(err) => {
    if (err){
        console.error(err.message);
    }
});

// create a table for the users
tableStatement = "CREATE TABLE users (ID, NAME, EMAIL, USERNAME, PASSWORD, ADDRESS)";
db.run(tableStatement, console.log("Books table is created!"), (err) => {
    if (err){
        console.error(err.message);
    }
});
db.close();
