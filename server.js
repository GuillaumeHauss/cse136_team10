var config = require('./config');
var db = require('./db');
var books = require('./books');
var bookmarks = require('./bookmarks');
var users = require('./users');
var md5 = require('./md5');

db.init();

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

var app = express();
app.use(mySession);

app.use("/styles",express.static("./views/styles"));

/*  Not overwriting default views directory of 'views' */
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes - consider putting in routes.js */
app.get('/login', users.loginForm);
app.post('/login', users.login);
app.get('/logout', users.logout);

app.get('/error', function(req, res) {
  res.render('./views/users/error.ejs')

});

app.post('/newAccountForm', users.newAccountForm);
app.post('/newAccount', users.newAccount);
/*  This must go between the users routes and the books routes */
app.use(users.auth);

app.get('/bookmarks', bookmarks.list);
app.get('/bookmarks/add', bookmarks.add);
app.post('/bookmarks/insert', bookmarks.insert);

app.get('/books', books.list);
app.get('/books/add', books.add);
app.get('/books/edit/:book_id(\\d+)', books.edit);
app.get('/books/confirmdelete/:book_id(\\d+)', books.confirmdelete);
app.get('/books/delete/:book_id(\\d+)', books.delete);
app.post('/books/update/:book_id(\\d+)', books.update);
app.post('/books/insert', books.insert);

app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});