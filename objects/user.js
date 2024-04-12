// This file is used to describe the structure of the user object, so a user must have an id, username, password etc. It also contains some useful functions for the user database.
const sqlite3 = require("sqlite3").verbose();
class user{
    // attributes // constructor
    constructor(name, email, username, password, address, reservationHistory = [],currentReservation = []){
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password; // maybe run through hash function? safety number one
        this.address = address;
        this.reservationHistory = reservationHistory;
        this.currentReservation = currentReservation;
    }
    // log to db
    async addToDB() {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
                console.log("successful connection to books database");
            });
            
            let userInfo = [this.name, this.email, this.username, this.password, this.address, JSON.stringify(this.reservationHistory),JSON.stringify(this.currentReservation)];
            let sqlStatement = "INSERT INTO users(NAME, EMAIL, USERNAME, PASSWORD, ADDRESS, RESERVATION_HISTORY, CURRENT_RESERVATIONS) VALUES (?,?,?,?,?,?,?)";
            db.run(sqlStatement, userInfo, (err) => {
                db.close();
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
    // reservation logic?
    async reserve(id) {
        return new Promise((resolve, reject) => {
            this.currentReservation.push(id);
            this.reservationHistory.push(id);
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connection Successful");
                    let sqlStatement = "UPDATE users SET RESERVATION_HISTORY = ?, CURRENT_RESERVATIONS = ? WHERE USERNAME = ?";
                    db.run(sqlStatement, [JSON.stringify(this.reservationHistory),JSON.stringify(this.currentReservation), this.username], (err, result) => {
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
    async release(id){
        return new Promise((resolve, reject) => {
            this.currentReservation.pop(id);
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connection Successful");
                    let sqlStatement = "UPDATE users SET CURRENT_RESERVATIONS = ? WHERE USERNAME = ?";
                    console.log(JSON.stringify(this.currentReservation));
                    db.run(sqlStatement, [JSON.stringify(this.currentReservation), this.username], (err, result) => {
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
    
    // fetch user object from database function -> userobject, if no such user exists, return none/null
    
    static async fetch(username) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
            });

            let sqlStatement = "SELECT * from users WHERE username = ?";
            db.get(sqlStatement, [username], (err, result) => {
                db.close();
                if (err) {
                    reject(err);
                }
                let userObj = null;
                if (result){
                    userObj = new user(result.NAME, result.EMAIL, result.USERNAME, result.PASSWORD, result.ADDRESS, JSON.parse(result.RESERVATION_HISTORY), JSON.parse(result.CURRENT_RESERVATIONS));
                }
                resolve(userObj);
            });
        });
    }
}

module.exports = user;