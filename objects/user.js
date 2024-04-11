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

            let userInfo = [this.name, this.email, this.username, this.password, this.address, this.reservationHistory];
            let sqlStatement = "INSERT INTO users(NAME, EMAIL, USERNAME, PASSWORD, ADDRESS, RESERVATION_HISTORY, CURRENT_RESERVATION) VALUES (?,?,?,?,?,?,?)";
            db.run(sqlStatement, userInfo, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });

            db.close();
        });
    }
    // reservation logic?
    static async reserve(name,id){
        let db = new sqlite3.Database("database/books.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                reject(err);
            }
        });

        let sqlStatement = "UPDATE users RESERVATION_HISTORY = RESERVATION_HISTROY + ? WHERE username = ?";
        db.run(sqlStatement, [id,name], (err, result) => {
            db.close();
            if (err) {
                reject(err);
            }
            resolve();
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
                    userObj = new user(result.NAME, result.EMAIL, result.USERNAME, result.PASSWORD, result.ADDRESS, result.RESERVATION_HISTORY, result.CURRENT_RESERVATION);
                }
                resolve(userObj);
            });
        });
    }
}

module.exports = user;