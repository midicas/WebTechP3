// This file is used to initialize a books/user database
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 
const user = require("../objects/user");

// Check if the database file exists
const dbPath = "./database/books.db"
if (!fs.existsSync(dbPath)) {
    // If the file doesn't exist, create a new database file
    fs.closeSync(fs.openSync(dbPath, 'w'));
}
// create the book/user database
// Create connection to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Database connection error:", err.message);
    }
    console.log("Database connection successful");
});

// Create a table for the books
const createBooksTable = () => {
    const tableStatement = `
        CREATE TABLE IF NOT EXISTS books (
            ID INTEGER PRIMARY KEY,
            TITLE TEXT,
            URL TEXT,
            AUTHOR TEXT,
            GENRE TEXT,
            PUBLISHER TEXT,
            DESCRIPTION TEXT,
            YEAR INTEGER,
            AVAILABLECOPIES INTEGER
        )`;
    db.run(tableStatement, (err) => {
        if (err) {
            console.error("Error creating books table:", err.message);
        } else {
            console.log("Books table created successfully");
        }
    });
};

// Create a table for the users
const createUsersTable = () => {
    const tableStatement = `
        CREATE TABLE IF NOT EXISTS users (
            NAME PRIMARY TEXT,
            EMAIL TEXT,
            USERNAME TEXT,
            PASSWORD TEXT,
            ADDRESS TEXT,
            RESERVATION_HISTORY TEXT,
            CURRENT_RESERVATIONS TEXT,
        )`;
    db.run(tableStatement, (err) => {
        if (err) {
            console.error("Error creating users table:", err.message);
        } else {
            console.log("Users table created successfully");
        }
    });
};

// Initialize tables
createBooksTable();
createUsersTable();

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error("Error closing database connection:", err.message);
    }
    console.log("Database connection closed");
});