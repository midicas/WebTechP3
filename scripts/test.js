const sqlite3 = require("sqlite3").verbose();
const book = require("../objects/book"); 
const user = require("../objects/user");
var db = new sqlite3.Database("../database/books.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("connection successful");
})

// add all starting books to database
booksArray = [
    new book("test","test","test","test","test",1)
];

for (bookie of booksArray){
    bookie.addToDB();
}

// add test user to db
testUser = new user(1,"john", "test@yeehaw.com", "johnatron", "password", "1234 negro arroya lane NM");
console.log(testUser.fetch(testUser.username))


// function selectRows() {
//     db.each('SELECT username FROM users', (error, row) => {
//       if (error) {
//         throw new Error(error.message);
//       }
//       console.log(row);
//     });
//   };
// selectRows(); 