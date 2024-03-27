const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 

var db = new sqlite3.Database("database/books.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("connection successful");
})

// create a table for the books to reside in :>
let sqlStatement = "CREATE TABLE";
db.run();

// add all books to database
booksArray = [
    new book("test","test","test","test","test",1)
];

for (bookie of booksArray){
    bookie.addToDB();
}

db.close();
