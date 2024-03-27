// This file is used to describe the structure of the user object, so a user must have an id, username, password etc. It also contains some useful functions for the user database.

class user{
    // attributes

    // constructor
    constructor(id, name, email, username, password, address){
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password; // maybe run through hash function? safety number one
        this.address = address;
    }
    // log to db
    // reservation logic?
}