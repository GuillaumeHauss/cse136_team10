var config = require('./config-template');
var db = require('./db');
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

/*  Not overwriting default views directory of 'views' */
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes - consider putting in routes.js */
app.get('/login', users.loginForm);
app.post('/login', users.login);
app.get('/logout', users.logout);

app.post('/newAccountForm', users.newAccountForm);
app.post('/newAccount', users.newAccount);
/*  This must go between the users routes and the books routes */
app.use(users.auth);

app.get('/bookmark/export', bookmarks.exportBookmark);
app.post('/bookmark/import', bookmarks.exportBookmark);

app.get('/bookmark', bookmarks.list);

app.get('/bookmark/add', bookmarks.add)
app.post('/bookmark/insert', bookmarks.insert);

app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});
