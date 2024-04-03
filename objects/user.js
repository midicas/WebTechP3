// This file is used to describe the structure of the user object, so a user must have an id, username, password etc. It also contains some useful functions for the user database.
const sqlite3 = require("sqlite3").verbose();
class user{
    // attributes // constructor
    constructor(id, name, email, username, password, address, reservationHistory = []){
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password; // maybe run through hash function? safety number one
        this.address = address;
        this.reservationHistory = reservationHistory;
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

            let userInfo = [this.id, this.name, this.email, this.username, this.password, this.address, this.reservationHistory];
            let sqlStatement = "INSERT INTO users(ID, NAME, EMAIL, USERNAME, PASSWORD, ADDRESS, RESERVATION_HISTORY) VALUES (?,?,?,?,?,?,?)";
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
                    userObj = new user(result.ID,result.NAME, result.EMAIL, result.USERNAME, result.PASSWORD, result.ADDRESS, result.RESERVATION_HISTORY);
                }
                resolve(userObj);
            });
        });
    }
}

module.exports = user;