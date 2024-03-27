// This file is dedicated to defining a structure for a book object. A book contains a title, author, description etc but also number available. It has some useful methods for interacting with the books database. 
const sqlite3 = require("sqlite3").verbose();
class book{
    //constructor and attributes
    constructor(id, title, author, description, year, availableCopies){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.year = year;
        this.availableCopies = availableCopies;
    }

    // log this book to db
    addToDB() {
        let db = new sqlite3.Database("database/books.db", (err) => {
            if (err){
                console.error(err.message);
            }
            console.log("successful connection to books database");
        });

        let bookInfo = [this.id, this.title, this.author, this.description, this.year, this.availableCopies];
        let sqlStatement = "INSERT INTO books(id, title, author, description, year, availableCopies) VALUES (?,?,?,?,?,?)";
        db.run(sqlStatement, bookInfo, (err) => {
            if (err){
                console.error(err.message);
            }
        })

        db.close();
    }
}

module.exports = book;