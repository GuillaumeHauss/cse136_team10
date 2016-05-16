var MYSQL = require('.././db');
var fs = require('fs');

function bookmarkToRowString(bookmark) {
  var username = bookmark['useranme'];
  var title = bookmark['title'];
  var url = bookmark['url'];
  var description = bookmark['description'];
  var star = bookmark['star'];
  var tag1 = bookmark['tag1'];
  var tag2 = bookmark['tag2'];
  var tag3 = bookmark['tag3'];
  var tag4 = bookmark['tag4'];
  var creationDate = bookmark['creationDate'];
  var lastVisit = bookmark['lastVisit'];
  var counter = bookmark['counter'];
  var folder = bookmark['folder'];
  var rowString = '';
  rowString += 'username=' + username + '&';
  rowString += 'title=' + title + '&';
  rowString += 'url=' + url + '&';
  rowString += 'description=' + url + '&';
  rowString += 'star=' + star + '&';
  rowString += 'tag1=' + tag1 + '&';
  rowString += 'tag2=' + tag2 + '&';
  rowString += 'tag3=' + tag3 + '&';
  rowString += 'tag4=' + tag4 + '&';
  rowString += 'creationDate=' + creationDate + '&';
  rowString += 'lastVisit=' + lastVisit + '&';
  rowString += 'counter=' + counter + '&';
  rowString += 'folder=' + folder;
}

function rowStringToBookmark(rowString) {
  var bookmark = {};
  var keyvalues = rowString.split('&');
  for (var i = 0 ; i < keyvalues.length ; i++) {
    var pair = keyvalues[i];
    var split = pair.split('=');
    bookmark[split[0]] = split[1];
  }
  return bookmark;
}

/**
 * Exports a bookmark object to a text file
 * @param bookmark - A bookmark object
 */
module.exports.exportBookmark = function(username, title) {
  MYSQL.init();
  MYSQL.query('SELECT * FROM Bookmarks WHERE username = ' + username + ' AND '
    + 'title', function(error, bookmark) {
    fs.writeFile('' + bookmark.name, bookmarkToRowString(bookmark), function(err) {
      if (err) {
        console.error('Error: ' + err);
      }
    });
  });
}
/**
 * Imports a bookmark file into the MySQL database
 * @param filename - the name of the file with the bookmark rowString
 */
module.exports.importBookmark = function(username, filename) {
  fs.readFile(filename, function(err, data) {
    var bookmark = rowStringToBookmark(data);
    MYSQL.init();
    MYSQL.query('SELECT * FROM user WHERE username =' + bookmark.username, function(err, result) {
      if (err) throw err;
      if (result === null) {
        console.error('ERROR: There is user with username ' + bookmark.username);
        return;
      }
      // The user exists, so delete any other bookmark with the same title that this user has stored
      MYSQL.query('Delete * FROM bookmark WHERE username = ' + bookmark.username
        + ' AND title = ' + bookmark.title, function(err, result) {
        if (err) throw err;
        console.log('Deleted ' + result.affectedRows + 'rows')
      });
      MYSQL.query('INSERT INTO bookmark (' + bookmark.username + ', ' + bookmark.title, ', ' + bookmark.url
        + ', ' + bookmark.description + ', ' + bookmark.star + ', ' + bookmark.tag1 + ', ' + bookmark.tag2
        + ', ' + bookmark.tag3 + ', ' + bookmark.tag4 + ', ' + bookmark.creationDate + ', ' + bookmark.lastVisit
        + ', ' + bookmark.counter + ', ' + bookmark.folder + ')', function(err, result) {
        console.log('Inserted ID: ' + result.insertId);
      });
    });
  })
}
