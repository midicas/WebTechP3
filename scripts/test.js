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
    new book(1,
        "The Circle",
        "https://upload.wikimedia.org/wikipedia/en/2/28/The_Circle_%28Dave_Eggers_novel_-_cover_art%29.jpg?20140811060221",
        "David Eggers",
        "\"The Circle,\" is a gripping tale set in a near-future Silicon Valley, where the power and influence of technology corporations reign supreme. The narrative revolves around Mae Holland, a young and ambitious woman who secures a coveted position at The Circle, a fictional tech company reminiscent of Google or Facebook. As Mae delves deeper into her role, she becomes increasingly enmeshed in the company's culture of transparency and surveillance, blurring the lines between her professional and personal life. Eggers skillfully navigates themes of privacy, ethics, and the consequences of unchecked technological advancement, offering readers a thought-provoking exploration of the perils of a hyper-connected world.",
        1993,
        "Knopf",
        "Thriller",
        5),
    new book(2,
        "A HeartBreaking Work of Staggering Genius",
        "https://upload.wikimedia.org/wikipedia/en/6/66/Heartbreaking_Work_Dave_Eggers.jpg"
        ,"David Eggers",
        "This memoir, detailing the challenges Eggers faced after the death of both of his parents, thrust him into the literary spotlight. The book is notable for its inventive style and emotional depth, blending humor and pathos as it explores themes of family, grief, and the burdens of responsibility.",
        2000,
        "Simon & Schuster",
        "Memoir",
        5)
];

for (bookie of booksArray){
    bookie.addToDB();
}

// add test user to db

main()

async function main(){
    /*const testUser = new user(1,"Ruben", "ruben@coolzijn.nl", "rubendepuben", "adminadmin", "1234 negro arroya lane NM", "jeweetzelf");
    await testUser.addToDB();
    await testUser.fetch("rubendepuben");*/

    const testBook = await book.fetch(1,10);
    console.log(testBook);
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