var BookmarkIOService = require('./services/BookmarkIOService');


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
