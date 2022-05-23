//TO START SERVER ENTER IN THE COMMAND LINE "NPM START"
const express = require('express'); //Assigning expreess library to variable.

const path = require('path'); //Assinging path to variable

const mysql =require('mysql2'); //Assigning mysql2 library to variable.

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const db = require('./public/js/db'); //Linking database utility functions and query to the server(app.js)
const res = require('express/lib/response'); //He popped up randomly LMAO
const httpPort = 3000; //setting up the port numbers

const hostname = "127.0.0.1"; //Setting the localhost
//Setting up express path ways.
const app = express();
app.use(express.urlencoded({ extended: true }));

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connecting to the pug engine and setting it as my base template
app.set('view engine', 'pug');
app.set('views', './public/views');

const { Preview } = require("./public/models/preview");
const { Book } = require("./public/models/book");
const { Members } = require("./public/models/members");
const { execPath } = require('process');



app.use(express.static(path.join(__dirname, 'public')));
//Setting up book reservations page
app.get("/", function(req, res) {
    console.log(req.session);
    if (req.session._id) {
        res.render("index");
    } else {
        res.render("landing");
    }
    res.end();
});
//Account information -NOT IMPORTANT-
app.get("/account", function(req, res) {
        if (req.session._id) {
            res.render("account");
        }
        else {
            res.render("landing");
        }
        res.end();   
});
//Setting up Library 
app.get("/library", function(req, res) {
    var description = 'select `book_name`, `book_author`, `book_id`, `genre` from books'; // SQL query collecting information from `book` database.
    db.query(description).then(results => {
        if (req.session._id) {
            res.render("library", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();//Stores sql query into the data variable which is then outputted in the pug template 'library.pug'
    });
});

app.get("/action", function(req, res) {
    var genre1 = 'select `book_name`, `book_author`, `book_id` from books where `genre` = "Action"';
    db.query(genre1).then(results => {
        if (req.session._id) {
            res.render("action", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();
    });
});
app.get("/dystopian", function(req, res) {
    var genre1 = 'select `book_name`, `book_author`, `book_id` from books where `genre` = "Dystopian"';
    db.query(genre1).then(results => {
        if (req.session._id) {
            res.render("dystopian", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();
    });
});
app.get("/mystery", function(req, res) {
    var genre1 = 'select `book_name`, `book_author`, `book_id` from books where `genre` = "Mystery"';
    db.query(genre1).then(results => {
        if (req.session._id) {
            res.render("mystery", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();
    });
});
app.get("/romance", function(req, res) {
    var genre1 = 'select `book_name`, `book_author`, `book_id` from books where `genre` = "Romance"';
    db.query(genre1).then(results => { 
        if (req.session._id) {
            res.render("romance", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();
    });
});
app.get("/thriller", function(req, res) {
    var genre1 = 'select `book_name`, `book_author`, `book_id` from books where `genre` = "Thriller"';
    db.query(genre1).then(results => {
        if(req.session._id) {
            res.render("thriller", {data:results});
        }
        else {
            res.render("landing");
        }
        res.end();        
    });
});

// !!!!! WORK IN PROGRESS !!!!! 

//Using OOP Models to get database information
app.get("/solo-book/:book_id", async function (req, res) {
    var bookId = req.params.book_id;
    var book = new Preview(bookId);
    book.getPreviewDetails().then(
        Promise => {
            book.getPreviewChapter().then(
                Promise => {
                    if (req.session._id) {
                        console.log(book)
                        res.render("preview", {book:book});
                    }
                    else {
                        res.render("landing");
                    }
                    res.end();
                }
            )
        }
    )
});
//Reservations
app.get("/reserved/:book_id", async function(req, res) {
    var reserved = req.params.book_id;
    var book = new Book(reserved);
    await book.getBookDetails();
    await book.getBookAuthor();
    await book.getBookGenre();
    if (req.session._id) {
        console.log(book)
        res.render("reserved", {reserved:book})
    }
    else {
        res.render("landing");
    }
    res.end(); //gotta figure out how to save this content to the webpage.
});

//Testing different ways to display books
app.get("/test", function(req, res) {
    var test = 'select `book_name`, `book_author`, `book_id`, `genre` from books';
    db.query(test).then(results => {
        if (req.session._id) {
            res.render("test", {experiment:results});
        }
        else {
            res.render("landing");
        }
        res.end();
    });   
});

//Adding a review to a book preview
app.post('/rev', function (req, res) {
    params = req.body;
    var bookReview = new Preview(params.book_id)
    try {
        console.log(params);
        bookReview.getReview(params.review).then(result => {
            res.send('form submitted')
        })
    } catch (err) {
        console.error(`Error while adding note`, err.message);
    }
});

app.get('/register', async function (req, res) {
    res.render("register");
});

app.post('/registration', urlencodedParser, function (req, res) {
    const {email, username, password} = req.body;
    console.log('email is :', email, 'password is:', password);
    var member = new Members;
    try {
        member.getEmailId(email).then(mId => {
            if (mId) {
                console.log('user exists');
                res.send('A user with this email already exists');
            }
            else {
                console.log('user doesnt exist')
                member.addMember(email, username, password).then(Promise => {
                    console.log(member);
                    res.redirect('/login');
                });
            }
        })
    } catch (err) {
        console.error(`error while adding password`, err.message);
        res.send('error with password')
    }
})

app.get('/login', function (req, res) {
    res.render("landing");
})

app.post('/login', urlencodedParser, function (req, res) {
    const {username, password} = req.body;
    console.log('username is:', username, 'password is:', password);
    var member = new Members;
    try {
        member.authenticate(username, password).then(result => {
            if (result.match) {
                req.session._id = result._id;
                req.session.loggedIn = true;
                console.log(req.session);
                res.redirect('/');
            }
            else {
                res.send('invalid password');
            }
        });
    } catch (err) {
        console.error(`error while comparing`, err.message);
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
})


app.listen(httpPort, function () {
    console.log(`Running at http:// ${hostname}:${httpPort}!`);
}); 