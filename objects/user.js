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
    addToDB(){
        let db = new sqlite3.Database("../database/books.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                console.error(err.message);
            }
            console.log("successful connection to books database");
        });

        let userInfo = [this.id, this.name, this.email, this.username, this.password, this.address]
        let sqlStatement = "INSERT INTO users(ID, NAME, EMAIL, USERNAME, PASSWORD, ADDRESS) VALUES (?,?,?,?,?,?)";
        db.run(sqlStatement, userInfo, (err) => {
            if(err){
                console.error(err.message);
            }
        })

        db.close();
    }
    // reservation logic?

    // fetch user object from database function -> userobject, if no such user exists, return none/null
    fetch(username){
        let db = new sqlite3.Database("../database/books.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                console.error(err.message);
            }
        });

        let sqlStatement = "SELECT * from users WHERE username = ?";
        db.get(sqlStatement, [username], (err,result) => {
            db.close();
            if(err){throw err};
            
            return result;
        });
        
    }
}

module.exports = user;