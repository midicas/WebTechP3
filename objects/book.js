// This file is dedicated to defining a structure for a book object. A book contains a title, author, description etc but also number available. It has some useful methods for interacting with the books database. 
const sqlite3 = require("sqlite3").verbose();
class book{
    //constructor and attributes
    constructor(id, title, url, author, description, year, publisher, genre,availableCopies){
        this.id = id;
        this.title = title;
        this.url = url
        this.author = author;
        this.description = description;
        this.year = year;
        this.publisher = publisher;
        this.genre = genre;
        this.availableCopies = availableCopies;
    }

    // log this book to db
    addToDB() {
        let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                console.error(err.message);
            }
            console.log("successful connection to books database");
        });

        let bookInfo = [this.id, this.title, this.url, this.author, this.genre, this.publisher, this.description, this.year, this.availableCopies];
        let sqlStatement = "INSERT INTO books(id, title, url, author, genre, publisher, description, year, availableCopies) VALUES (?,?,?,?,?,?,?,?,?)";
        db.run(sqlStatement, bookInfo, (err) => {
            if (err){
                console.error(err.message);
            }
        })

        db.close();
    }
    static async fetch(start,end) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
            });
            console.log("Connection successfull");
            let sqlStatement = "SELECT * from books WHERE ID BETWEEN ? AND ?";
            db.all(sqlStatement,[start,end], (err, result) => {
                db.close();
                if (err) {
                    reject(err);
                }
                const books = result.map(row => new book(
                    row.ID,
                    row.TITLE,
                    row.URL,
                    row.AUTHOR,
                    row.DESCRIPTION,
                    row.YEAR,
                    row.PUBLISHER,
                    row.GENRE,
                    row.AVAILABLECOPIES
                ));
                resolve(books);
            });
        });
    }
    static async reserve(){
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
            });

            let sqlStatement = "UPDATE books SET AVAILABLECOPIES = AVAILABLECOPIES-1 WHERE ID = ?";
            db.run(sqlStatement,this.id, (err, result) => {
                db.close();
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

    }
}

module.exports = book;