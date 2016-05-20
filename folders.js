var db = require('./db');
var error = require('./error');

module.exports.add = function(req, res) {
  if(req.session && req.session.user != undefined){
    res.render('folders/addFolder.ejs');
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

module.exports.insert = function(req, res) {
   if(req.session && req.session.user != undefined){
  var user = req.session.user;

  if (req.body.title === "\s") {
    res.render("/error", {errorType: form});
  }

  var query = 'INSERT INTO folder (name, username) VALUES (' + db.escape(req.body.title) + ', ' + db.escape(user) + ')';
  db.query(query, function(err){
    if (err) throw err;
    res.redirect('/bookmarks');
  });
   }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
}
