var config = require('./config');
var db = require('./db');
var books = require('./books');
var bookmarks = require('./bookmarks');
var users = require('./users');
var md5 = require('./md5');
var folders = require('./folders');

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

app.get('/pwdForgot', users.pwdForgot);
app.post('/resetPwd', users.resetPwd);
app.post('/newAccountForm', users.newAccountForm);
app.post('/newAccount', users.newAccount);
/*  This must go between the users routes and the books routes */
app.use(users.auth);

/* Route to show the bookmark*/

app.get('/api/bookmarks', bookmarks.list);

app.get('/folders/add', folders.add);
app.post('/folders/insert', folders.insert);

/*Sorting routes*/
app.get('/api/sortTitle', bookmarks.sortTitle);
app.get('/api/sortURL', bookmarks.sortURL);
app.get('/api/sortStar', bookmarks.sortStar);
app.get('/api/sortCreateDate', bookmarks.sortCreateDate);
app.get('/api/sortLastVisit', bookmarks.sortLastVisit);
app.get('/api/sortCounter', bookmarks.sortCounter);
app.post('/api/search', bookmarks.search);

/* Crud routes for utility functions */
app.get('/api/bookmarks/star/:bookmark_title/:bookmark_star(\\d)', bookmarks.star);
app.get('/api/bookmarks/counter/:bookmark_title/:bookmark_username', bookmarks.counter);

/* Crud Routes for Bookmarks*/
app.get('/api/bookmarks/add', bookmarks.add);
app.post('/api/bookmarks/insert', bookmarks.insert);

app.get('/api/bookmarks/confirm-delete/:bookmark_id',bookmarks.confirmDelete);
app.delete('/api/bookmarks/delete/:bookmark_id',bookmarks.delete);

app.get('/api/bookmarks/edit/:bookmark_id', bookmarks.edit);
app.post('/api/bookmarks/update/:bookmark_id', bookmarks.update);



// Import and export individual bookmarks
app.post('/bookmark/export/', bookmarks.exportBookmark);
app.post('/bookmark/import/', bookmarks.importBookmark);

// Import and export folders
app.post('/folder/export', bookmarks.exportFolder);
app.post('/folder/import', bookmarks.importFolder);


app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});
