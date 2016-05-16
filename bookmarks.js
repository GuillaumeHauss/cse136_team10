/**
 * Created by abbas on 5/15/16.
 */
var db = require('./db');
var regex = require("regex");
var users = require('./users');



var list = module.exports.list = function(req, res) {

  console.log(req.session.user);
  // if (!req.session) res.render('/error', error.errors['url'])
  //if (!req.session.user )
  // add regex to check if user is of type name@email.com
  var user = req.session.user;
  db.query('SELECT * from bookmark where username = ' + db.escape(user), function (err, bookmarks) {
    if (err) throw err;
    // console.log(bookmarks);
    res.render('bookmarks/list.ejs', {bookmarks: bookmarks});
  });
};

module.exports.add = function(req, res) {
  res.render('bookmarks/add.ejs');
};

module.exports.insert = function(req, res){
  // if (!req.session) res.redirect('/error');
  var user = req.session.user;

  var title = db.escape(req.body.title);
  var url = db.escape(req.body.url);
  var description = db.escape(req.body.description);
  var star = 0;

  var tag = ['NULL', 'NULL', 'NULL', 'NULL'];
  if (req.body.tag1) tag[0] = req.body.tag1;
  if (req.body.tag2) tag[1] = req.body.tag2;
  if (req.body.tag3) tag[2] = req.body.tag3;
  if (req.body.tag4) tag[3] = req.body.tag4;

  var date = new Date();
  date =  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
  if (req.body.star) star = "on";


  var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var urlRegex = new RegExp(urlExpression);
  if (!url.match(urlRegex)) {
    // change all errors to specific ones
    console.log("urlreg");
    res.redirect('/error');
  }


  var queryString = 'INSERT INTO bookmark (username, title, url, description, star, tag1, tag2, tag3, tag4, creationDate, lastVisit, counter, folder) VALUES (' + db.escape(user) + ', ' + title  + ', '  + url + ', ' + description + ', ' + db.escape(star) + ', ' + db.escape(tag[0]) + ', ' + db.escape(tag[1]) + ', ' + db.escape(tag[2]) + ', ' + db.escape(tag[3]) + ', ' +  db.escape(date) + ', ' + db.escape(date) + ', ' + db.escape(0) + ', ' + 'NULL' + ')';

  db.query(queryString, function(err){
    if (err) throw err;
    res.redirect('/bookmarks');
  });
};

var BookmarkIOService = require('./services/BookmarkIOService');
var db = require('./db');

/**
 * Exports a textfile that is named the name of the bookmark
 * @param req
 * @param res
 */
module.exports.exportBookmark = function(req, res) {
  var id = req.params.book_id;
  BookmarkIOService.exportBookmark(id);
};

/**
 * Imports a textfile containing one bookmark into the database if
 * the user exists that is refrenced in the file
 */
module.exports.importBookmark = function(req, res) {
  var filename = req.body.filename;
  BookmarkIOService.importBookmark(filename);
};

/**
 * Adds a new book to the database
 * Does a redirect to the list page
 */
module.exports.insert = function(req, res){
  var username = req.session.user;
  var title = db.escape(req.body.title);
  var url = db.escape(req.body.url);
  var description = db.escape(req.body.description);
  var star = db.escape(req.body.star);
  star === 'on' ? star = 1 : star = 0;
  var tag1 = db.escape(req.body.tag1);
  var tag2 = db.escape(req.body.tag2);
  var tag3 = db.escape(req.body.tag3);
  var tag4 = db.escape(req.body.tag4);
  var creationDate =  null;
  var lastVisit = null;
  var counter = 0;
  var folder = db.escape(req.body.folder);

  var queryString = 'INSERT INTO bookmark (username, title, url, description, star, tag1, tag2, tag3, tag4, creationDate, lastVisit, counter, folder) VALUES ('+ '"' + username + '"' + ', ' + title + ', ' + url + ', ' + description + ', ' + star + ', ' + tag1 + ', ' + tag2 + ', ' + tag3 + ', ' + tag4 + ', ' + creationDate + ', ' + lastVisit + ', ' + counter + ', ' +  folder + ')';

  db.query(queryString, function(err){
    if (err) throw err;
    res.redirect('/bookmark');
  });
};

module.exports.update = function(req,res) {
  var id = req.params.bookmark_id;
  var username = req.session.user;
  var title = db.escape(req.body.title);
  var url = db.escape(req.body.url);
  var description = db.escape(req.body.description);
  var star = db.escape(req.body.star);
  star === 'on' ? star = 1 : star = 0;
  var tag1 = db.escape(req.body.tag1);
  var tag2 = db.escape(req.body.tag2);
  var tag3 = db.escape(req.body.tag3);
  var tag4 = db.escape(req.body.tag4);
  var folder = db.escape(req.body.folder);

  var queryString = 'UPDATE bookmark SET title = ' + title + ', url = ' + url + ', description = ' + description + ', star = ' + star + ', tag1 = ' + tag1 + ', tag2 = ' + tag2 + ', tag3 = ' + tag3 + ', tag4 = ' + tag4 + ', folder = ' + folder + 'WHERE title = ' + "'" + id + "'";
  console.log(queryString);
  db.query(queryString, function(err){
    if (err) throw err;
    res.redirect('/bookmark');
  });

}

/** Renders the Edit page with the edit.ejs template
 *
 */
module.exports.edit = function(req, res) {
  var id = req.params.bookmark_id;
  db.query('SELECT * from bookmark WHERE title = ' + "'" + id + "'", function(err, bookmark) {
    if (err) throw err;
    res.render('bookmarks/edit', {bookmark: bookmark[0]});
  });
};

/**
 *
 * Renders the add page with the add.ejs template
 */
module.exports.add = function(req, res) {
  res.render('bookmarks/add');
};


var list = module.exports.list = function(req, res) {
  db.query('SELECT * from books ORDER BY id', function(err, books) {
    if (err) throw err;

    res.render('bookmarks/list', {books: books});
  });
};