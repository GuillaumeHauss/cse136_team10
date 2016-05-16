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
  var username = db.escape(req.body.username);
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

  var queryString = 'INSERT INTO bookmark (username, title, url, description, star, tag1, tag2, tag3, tag4, creationDate, lastVisit, counter, folder) VALUES ('+ username + ', ' + title + ', ' + url + ', ' + description + ', ' + star + ', ' + tag1 + ', ' + tag2 + ', ' + tag3 + ', ' + tag4 + ', ' + creationDate + ', ' + lastVisit + ', ' + counter + ', ' +  folder + ')';

  db.query(queryString, function(err){
  if (err) throw err;
    res.redirect('/bookmarks');
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
