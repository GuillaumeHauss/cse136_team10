var db = require('./db');
var error = require('./error');
var BookmarkIOService = require('./services/BookmarkIOService');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var upload = multer({
  dest: './public/uploads/'
}).single('filename');

var list = module.exports.list = function(req, res) {
  var user = req.session.user;
  //console.log(user);
  //console.log(req.folders);
  db.query('SELECT * from folder WHERE username = ' + db.escape(user) + 'ORDER BY name', function(err, folders) {
    if (err) throw err;
    /*db.query('select bookmark.folder, bookmark.title, bookmark.url from folder left join bookmark on folder.name = bookmark.folder where bookmark.username =' + db.escape(user), function(err, bookmarks) {
      console.log("bookmark folders: " + bookmarks);
      for(var i = 0, len = folders.length; i < len; i++){
        console.log(bookmarks[i].folders);

      }
    });*/
    res.json(folders);
  });
};

module.exports.add = function(req, res) {
  if (req.session && req.session.user != undefined){
    res.render('folders/addFolder.ejs');
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.insert = function(req, res) {
  if (req.session && req.session.user != undefined){
    var user = req.session.user;
    console.log("Inserting into user: " + user);
    if (req.body.title === "\s") {
      res.render("errors/error", {errorType: error.form});
    }
    var name = req.body.title;
    console.log(name);
    db.query('select * from folder where name='+db.escape(name)+' and username='+db.escape(user), function(err1, results){
      if (err1){
        throw err1;
      }
      else{
        if (results.length==0){
          var query = 'INSERT INTO folder (name, username) VALUES (' + db.escape(req.body.title) + ', ' + db.escape(user) + ')';
          db.query(query, function(err){
            if (err) throw err;
            list(req,res);
          });
        }
        else{
          res.render('errors/error', {errorType:error.FolderTaken});
        }
      }

    });
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

module.exports.edit = function(req, res){
  if (req.session && req.session.user != undefined){
    var name = req.params.folder_name;
    res.render('folders/editFolder', {name:name});
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.update = function(req, res){
  var newName = req.body.name;
  var oldName = req.params.folder_name;
  if (req.session && req.session.user != undefined){
    var user = req.session.user;
    db.query('update folder set name='+db.escape(newName)+' where name='+db.escape(oldName), function(err){
      if (err){
        throw err;
        //res.redirect('505.ejs');
      }
      else{
        db.query('update bookmark set folder='+db.escape(newName)+ 'where folder = '+db.escape(oldName) +' and username='+ db.escape(user), function(err2){
          if (err2){
            throw err2;
          }
          else {
            res.redirect('/bookmarks');
          }
        });
      }
    });
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.confirmDelete = function(req, res){
  if (req.session && req.session.user != undefined){
    var name = req.params.folder_name;
    res.render('folders/confirm-deleteFolder', {name:name});
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.delete = function(req, res){
  console.log('enter the delete function');
  if (req.session && req.session.user !=undefined){

    var name = req.body.folderName;
    var user = req.session.user;
    db.query('delete from folder where name='+db.escape(name) +' and username='+db.escape(user), function(err){
      if (err){
        throw err;
      }
      else{
        db.query('update bookmark set folder=null where folder='+db.escape(name) +' and username ='+db.escape(user), function(err2){
          if (err){
            throw err;
          }
          else{
            res.redirect('/bookmarks');
          }
        });
      }
    });
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }

};

module.exports.addBookmarkToFolder = function(req, res){
  console.log(req.session.user);
  //if (req.ression && req.session.user != undefined){
  var user = req.session.user;
  var name = req.params.folder_name;
  db.query('select * from bookmark where username='+db.escape(user), function(err, bookmarks){
    if (err){
      throw err;
    }
    else{
      res.render('folders/addBookmark',{bookmarks:bookmarks , name:name});
    }
  });

  /*}
   else{
   res.render('errors/error', {errorType:error.notLoggedIn});
   }*/
};

module.exports.addBookmark = function(req, res){
  if(req.session && req.session != undefined){
    var user = req.session.user;
    var bookmark = req.body.bookmark;
    var folder = req.body.folder;
    db.query('update bookmark set folder='+db.escape(folder)+' where title='+db.escape(bookmark)+ 'and username='+db.escape(user), function(err){
      if (err){
        throw err;
      }
      else{
        res.redirect('/bookmarks');
      }
    });

  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.removeBookmarkFromFolder = function(req, res){
  var user = req.session.user;
  var name = req.params.folder_name;
  db.query('select * from bookmark where username='+db.escape(user)+' and folder='+db.escape(name), function(err, bookmarks){
    if (err){
      throw err;
    }
    else{
      res.render('folders/removeBookmark',{bookmarks:bookmarks , name:name});
    }
  });
};

module.exports.removeBookmark = function(req,res){
  if (req.session && req.session.user != undefined){
    var user = req.session.user;
    var name = req.body.folder;
    var title = req.body.bookmark;
    db.query('update bookmark set folder=null where username='+db.escape(user)+' and title='+db.escape(title), function(err){
      if (err){
        throw err;
      }
      else{
        res.redirect('/bookmarks');
      }
    });
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.import = function(req, res) {
  upload(req, res, function(err) {
    if (err) throw err;
    if (typeof req.file === 'undefined') {
      res.redirect('/bookmarks');
      return;
    }
    var filename = req.file.filename;
    var username = req.session.user;
    //console.log('filename');
    //console.log(filename);
    BookmarkIOService.importFolder(username, filename, function() {
      if (fs.existsSync(path.join(__dirname, 'public/uploads/' + filename))) {
        fs.unlink(path.join(__dirname, 'public/uploads/' + filename));
      }
      res.redirect('/bookmarks');
      return;
    });
  });
  res.redirect('/bookmarks');
};

module.exports.export = function(req, res) {
  /* if (!req.session) {
   //console.error('ERROR: No session');
   return;
   }*/
  var username = req.session.user;
  var name = req.body.name;
  console.log('folder');
  console.log(name);
  var filename = username + name + ' export';
  BookmarkIOService.exportFolder(username, name, function() {
    res.sendFile(filename);
  });
};
