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

var sess;
app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.user) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/bookmarks');
}
else {
    res.render('users/login');
}
});

/* Routes - consider putting in routes.js */
app.get('/login', users.loginForm);
app.post('/login', users.login);
app.get('/logout', users.logout);

app.get('/pwdForgot', users.pwdForgot);
app.post('/resetPwd', users.resetPwd);
app.post('/newAccountForm', users.newAccountForm);
app.post('/newAccount', users.newAccount);
/*  This must go between the users routes and the bookmarks routes */
app.use(users.auth);

app.get('/bookmarks', bookmarks.list);
app.get('/bookmarks/add', bookmarks.add);
app.post('/bookmarks/insert', bookmarks.insert);

app.get('/folders/add', folders.add);
app.post('/folders/insert', folders.insert);
app.get('/folders/edit/:folder_name', folders.edit);
app.post('/folders/update/:folder_name', folders.update);
app.get('/folders/confirm-delete/:folder_name', folders.confirmDelete);
app.post('/folders/delete', folders.delete);
app.get('/folders/addBookmarkToFolder/:folder_name', folders.addBookmarkToFolder);
app.post('/folders/addBookmark', folders.addBookmark);
app.get('/folders/removeBookmarkFromFolder/:folder_name', folders.removeBookmarkFromFolder);
app.post('/folders/removeBookmark', folders.removeBookmark);
/*Sorting routes*/
app.get('/sortTitle', bookmarks.sortTitle);
app.get('/sortURL', bookmarks.sortURL);
app.get('/sortStar', bookmarks.sortStar);
app.get('/sortCreateDate', bookmarks.sortCreateDate);
app.get('/sortLastVisit', bookmarks.sortLastVisit);
app.get('/sortCounter', bookmarks.sortCounter);

app.get('/bookmarks/edit/:bookmark_id', bookmarks.edit);
app.post('/bookmarks/update/:bookmark_id', bookmarks.update);

app.get('/bookmarks/star/:bookmark_title/:bookmark_star(\\d)', bookmarks.star);
app.get('/bookmarks/counter/:bookmark_title/:bookmark_username', bookmarks.counter);
app.get('/bookmarks/confirm-delete/:bookmark_id',bookmarks.confirmDelete);
app.post('/bookmarks/delete/:bookmark_id',bookmarks.delete);
app.post('/search', bookmarks.search);

// Import and export individual bookmarks
app.post('/bookmark/export/', bookmarks.exportBookmark);
app.post('/bookmark/import/', bookmarks.importBookmark);

// Import and export folders
app.post('/folder/export', folders.export);
app.post('/folder/import', folders.import);


/*
app.get('/books', books.list);
app.get('/books/add', books.add);
app.get('/books/edit/:book_id(\\d+)', books.edit);
app.get('/books/confirmdelete/:book_id(\\d+)', books.confirmdelete);
app.get('/books/delete/:book_id(\\d+)', books.delete);
app.post('/books/update/:book_id(\\d+)', books.update);
app.post('/books/insert', books.insert);
*/
app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});
