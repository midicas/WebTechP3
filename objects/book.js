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
            if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('UNIQUE')) {
                sqlStatement = "UPDATE books SET title=?, url=?, author=?, genre=?, publisher=?, description=?, year=?, availableCopies=? WHERE id=?"
                db.run(sqlStatement,[...bookInfo.slice(1),this.id], (err) => {
                    if (err){
                        console.error("Error updating book "+this.id+":"+err.message);
                    }
                })
            } else {
                console.error("Error uploading book:"+err.message); // Log other types of errors
            }
        })
        db.close();
    }
    static async fetch(ids) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
            });
            console.log("Connection successful");
            let sqlStatement = "SELECT * from books WHERE ID IN (" + ids.map(() => "?").join(",") + ")";
            db.all(sqlStatement, ids, (err, result) => {
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
                db.close();
            });
        });
    }
    async reserve() {
        return new Promise((resolve, reject) => {
            this.availableCopies -= 1;
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connection Successful");
                    let sqlStatement = "UPDATE books SET AVAILABLECOPIES = ? WHERE ID = ?";
                    db.run(sqlStatement, [this.availableCopies,this.id], (err, result) => {
                        db.close();
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve();
                    });
                }
            });
        });
    }
    async release() {
        return new Promise((resolve, reject) => {
            this.availableCopies += 1;
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connection Successful");
                    let sqlStatement = "UPDATE books SET AVAILABLECOPIES = ? WHERE ID = ?";
                    db.run(sqlStatement, [this.availableCopies,this.id], (err, result) => {
                        db.close();
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve();
                    });
                }
            });
        });
    }
}

module.exports = book;