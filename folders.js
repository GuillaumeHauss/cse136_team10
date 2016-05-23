var db = require('./db');
var error = require('./error');

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