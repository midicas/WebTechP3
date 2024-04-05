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

main()

async function main(){
    testUser = new user(1,"Ruben", "ruben@coolzijn.nl", "rubendepuben", "adminadmin", "1234 negro arroya lane NM", "jeweetzelf");
    await testUser.addToDB();
    a = await testUser.fetch("rubendepuben");
    console.log(a)
}



// function selectRows() {
//     db.each('SELECT username FROM users', (error, row) => {
//       if (error) {
//         throw new Error(error.message);
//       }
//       console.log(row);
//     });
//   };
// selectRows(); 