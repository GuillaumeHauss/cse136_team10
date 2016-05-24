var db = require('./db');
var regex = require("regex");
var users = require('./users');
var error = require('./error');
function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}


function updateList(sortParameter, req, res){

    //console.log(req.session.user);
    if (req.session && req.session.user != undefined){
    
    // add regex to check if user is of type name@email.com
    var user = req.session.user;
      db.query('select name from user where username = '+ db.escape(user), function(err, names) {
      // console.log(names);
      db.query('SELECT * from bookmark where username = ' + db.escape(user)+' order by '+sortParameter, function (err, bookmarks) {
        if (err) throw err;
        // (Select folder, title from bookmark where username = ' + db.escape(user) + ' and folder in (select folder from bookmark where username = ' + db.escape(user) + ')) union all (select name, null from folder where username = ' + db.escape(user) + ' and name not in (select folder from bookmark where username = ' + db.escape(user) + '))
        db.query("(Select folder, title, url from bookmark where username = " + db.escape(user) + " and folder != 'null' ) union (select name, null, null from folder where username = " + db.escape(user) + " and name not in (select folder from bookmark where username = " + db.escape(user) + " and folder != 'null'))", function (err, folders) {
          if (err) throw err;
        //console.log(folders);

          var foldersHash = {};

          for (var i = 0; i < bookmarks.length; i++) {
            
            if (bookmarks[i].folder != null && bookmarks[i].folder in foldersHash) {
              foldersHash[bookmarks[i].folder].push({"title": bookmarks[i].title, "url": bookmarks[i].url}); 
            }
            else if (bookmarks[i].folder != null && !(bookmarks[i].folder in foldersHash)) {
              foldersHash[bookmarks[i].folder] = [{"title": bookmarks[i].title, "url": bookmarks[i].url}]
            }
          }
        
          for (var i = 0; i < folders.length; i++) {
          if(!foldersHash[folders[i].folder] && foldersHash[folders[i].folder != null]) foldersHash[folders[i].folder] = [{"title": null, "url": null}];
          }
        
          var nameObj = names[0].name;
          res.render('bookmarks/list.ejs', {bookmarks: bookmarks, folders: foldersHash, name: nameObj});
        })

      });
    });
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
 /* if (req.session && req.session.user != undefined){
    var user = req.session.user;
    db.query('select name from user where username='+db.escape(user), function(err1, names){
      if (err1){
        throw err1;
      }
      else{
        name = names[0].name;
        db.query('select name from folder where username='+db.escape(user), function(err2, folders){
          if (err2){
            throw err2;
          }
          else{
            var finalMess = [];
            for (var i = 0 ; i<folders.length; i++){
              var folderName = folders[i].name;
              var temp1 = {};
              //temp1["folder"] = folderName;
              finalMess.push({folder:{"name":folderName}});
              console.log(finalMess);
              sql = "select title,url from bookmark where username="+db.escape(user)+" and folder="+db.escape(folders[i].name);
              db.query(sql, function(err3, bookmarks){
                if (err3){
                  throw err3;
                }
                else{
                  console.log(bookmarks);
                  if (bookmarks.length>0){
                        for (var j = 0; j <bookmarks.length; j++){
                        console.log('loop bookmark');
                          //finalMess[folders[i].name][bookmarks[j]].push({"title":bookmarks[j].title}, {"url":bookmarks[j].url});
                          var temp_obj = {};
                          temp_obj["bookmarks"] = {"title":bookmarks[j].title, "url":bookmarks[j].url};
                          console.log('folder to add to '+finalMess[folderName]);
                          finalMess[folderName].push(temp_obj);
                        
                        }
                  }
                  else{
                      var temp_obj = {};
                      temp_obj["bookmark"] = {"title":"", "url":""};
                      finalMess[folderName].push(temp_obj);
                  }
                }  
                });
            }
        
          
                   db.query('select * from bookmark where username='+db.escape(user), function(err4, fullList){
                    if (err4){
                      throw err4;
                    }
                    else{
                      res.render('bookmarks/list.ejs', {bookmarks: fullList, folders: finalMess, name: name});
                    }
                  });
                }
              });
            }
          });
        }
        else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }*/
};
    
  

var list = module.exports.list = function(req, res) {
  updateList('title', req, res);
};

module.exports.sortTitle = function(req, res) {
  updateList('title', req, res);
};

module.exports.sortURL = function(req, res) {
  updateList('url', req, res);
};

module.exports.sortLastVisit = function(req, res) {
  updateList('lastVisit DESC', req, res);
};

module.exports.sortCreateDate = function(req, res) {
  updateList('creationDate ASC', req, res);
};

module.exports.sortStar = function(req, res) {
  updateList('star DESC', req, res);
};

module.exports.sortCounter = function(req, res){
  updateList('counter DESC', req, res);
};

module.exports.search = function(req,res){
  if(req.session && req.session.user!=undefined){
    var searchTitle = req.body.searchString;
    var user = req.session.user;
    db.query('select name from user where username='+db.escape(user), function(err1, names){
    if (err1){
      throw err1;
    }
    else{
    db.query(" SELECT * FROM bookmark WHERE title LIKE '%" + searchTitle + "%' OR url LIKE'%" + searchTitle + "%' and username="+db.escape(user), function (err, bookmarks) {
        if (err) throw err;
        // (Select folder, title from bookmark where username = ' + db.escape(user) + ' and folder in (select folder from bookmark where username = ' + db.escape(user) + ')) union all (select name, null from folder where username = ' + db.escape(user) + ' and name not in (select folder from bookmark where username = ' + db.escape(user) + '))
        db.query("(Select folder, title, url from bookmark where username = " + db.escape(user) + " and folder != 'null' ) union (select name, null, null from folder where username = " + db.escape(user) + " and name not in (select folder from bookmark where username = " + db.escape(user) + " and folder != 'null'))", function (err, folders) {
          if (err) throw err;
        //console.log(folders);

          var foldersHash = {};

          for (var i = 0; i < bookmarks.length; i++) {
            
            if (/*bookmarks[i].folder != 'NULL' && */bookmarks[i].folder != null && bookmarks[i].folder in foldersHash) {
              foldersHash[bookmarks[i].folder].push({"title": bookmarks[i].title, "url": bookmarks[i].url}); 
            }
            else if (/*bookmarks[i].folder != 'NULL' && */bookmarks[i].folder != null && !(bookmarks[i].folder in foldersHash)) {
              foldersHash[bookmarks[i].folder] = [{"title": bookmarks[i].title, "url": bookmarks[i].url}]
            }
          }
        
          for (var i = 0; i < folders.length; i++) {
          if(!foldersHash[folders[i].folder] && foldersHash[folders[i].folder != null]) foldersHash[folders[i].folder] = [{"title": null, "url": null}];
          }
        
          var nameObj = names[0].name;
          res.render('bookmarks/list.ejs', {bookmarks: bookmarks, folders: foldersHash, name: nameObj});
        })

      });
    }
    })
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }
};

module.exports.add = function(req, res) {
  if(req.session && req.session.user != undefined){
    var user = req.session.user;
    db.query('select name from folder where username = ' + db.escape(user), function(err, folders) {
      if (err) throw err;
      res.render('bookmarks/add.ejs', {folders: folders});
    });
  }
  else{
    res.render('errors/error', {errorType:error.notLoggedIn});
  }  

};

module.exports.insert = function(req, res) {
  // if (!req.session) res.redirect('/error');
  if (req.session && req.session.user != undefined){
    var user = req.session.user;

    var title = req.body.title;
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var star = 0;
    if (req.body.folder != ""){
          var folder = req.body.folder;      
    }
    else{
      var folder = null;
    }

    
    var tag = ['NULL', 'NULL', 'NULL', 'NULL'];
    if (req.body.tag1) tag[0] = req.body.tag1;
    if (req.body.tag2) tag[1] = req.body.tag2;
    if (req.body.tag3) tag[2] = req.body.tag3;
    if (req.body.tag4) tag[3] = req.body.tag4;

    var date = new Date();
    date = date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    if (req.body.star) star = 1;

    else star = 0;

    var titleExpression = /^[a-z0-9\s]+$/i;
    var titleRegex = new RegExp(titleExpression);

    var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var urlRegex = new RegExp(urlExpression);

    //console.log("length of title" + title.length + ', ' + 'name of title: ' + title);
    if (!titleRegex.test(title) || title.length > 20) {
      //console.log("Error in title");
      res.render('errors/error', {errorType: error.titleError});
    }
    else if (!urlRegex.test(url)) {
      //console.log("Error in url");
      res.render('errors/error', {errorType: error.urlError});
    }
    else {
      var queryString = 'INSERT INTO bookmark (username, title, url, description, star, tag1, tag2, tag3, tag4, creationDate, lastVisit, counter, folder) VALUES (' + db.escape(
              user) + ', ' + db.escape(title) + ', ' + url + ', ' + description + ', ' + db.escape(
              star) + ', ' + db.escape(
              tag[0]) + ', ' + db.escape(tag[1]) + ', ' + db.escape(tag[2]) + ', ' + db.escape(tag[3]) + ', ' + db.escape(
              date) + ', ' + db.escape(date) + ', ' + db.escape(0) + ', ' + db.escape(folder) + ')';

      db.query(queryString, function (err) {
        if (err) {
          res.redirect('505.ejs');
          throw err;
          
        }
        res.redirect('/bookmarks');
      });

      if (!url.match(urlRegex)) {
        // change all errors to specific ones
        res.render('./errors/error', {errorType: error.url});

      }
    }
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

/*** Function to serve the edit bookmark view
 *
 * @param req
 * @param res
 */
module.exports.edit = function(req, res) {
  console.log(req.session.user);
  if(req.session && req.session.user != undefined){
    var id = req.params.bookmark_id;
    db.query('SELECT * from bookmark WHERE title = ' + "'" + id + "'", function(err, bookmark) {
      if (err){
        res.redirect('505.ejs');
        throw err;
      }
      res.render('bookmarks/edit', {bookmark: bookmark[0]});
    });
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

/*** Function to edit a bookmark
 *
 * @param req
 * @param res
 */
module.exports.update = function(req,res){
  if(req.ression && req.session.user != undefined){
    var id = req.params.bookmark_id;
    var title = req.body.title;
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var star = 0;

    var tag = ['', '', '', ''];
    if (req.body.tag1) tag[0] = req.body.tag1;
    if (req.body.tag2) tag[1] = req.body.tag2;
    if (req.body.tag3) tag[2] = req.body.tag3;
    if (req.body.tag4) tag[3] = req.body.tag4;

    if (req.body.star) star = "on";

    var titleExpression = /^[a-z0-9\s]+$/i;
    var titleRegex = new RegExp(titleExpression);

    var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var urlRegex = new RegExp(urlExpression);

    //console.log(titleRegex.test(title));
    if(!titleRegex.test(title) || title.length > 20 ){
      //console.log("Error in title");
      res.render('errors/error', {errorType : error.titleError});
    }
    else if(!urlRegex.test(url)){
    // console.log("Error in url");
      res.render('errors/error', {errorType : error.urlError});
    }
    else {
      var queryString = 'UPDATE bookmark SET title = ' + db.escape(title) + ', url = ' + url + ', description = ' + description + ', star = ' + star + ', tag1 = ' + db.escape(
              tag[0]) + ', tag2 = ' + db.escape(tag[1]) + ', tag3 = ' + db.escape(tag[2]) + ', tag4 = ' + db.escape(
              tag[3]) + 'WHERE title = ' + "'" + id + "'";
      //console.log(queryString);
      db.query(queryString, function (err) {
        if (err) {
          res.redirect('505.ejs');
          throw err;
          
        }
        res.redirect('/bookmarks');
      });
    }
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
}

/*** Function to serve the confirmation of deleting a bookmark
 *
 * @param req
 * @param res
 */
module.exports.confirmDelete = function(req,res){
  if (req.session && req.session.user != undefined){
    var id = req.params.bookmark_id;
    //console.log("id of bookmark: " + id);
    db.query('SELECT * from bookmark WHERE title = ' + "'" + id + "'", function (err, bookmark) {
      if (err) {
        res.redirect('505.ejs');
        throw err;
        
      }
      res.render('bookmarks/confirm-delete', {bookmark: bookmark[0]});
    });
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
}
/*** Function to delete a bookmark
 *
 * @param req
 * @param res
 */

module.exports.delete = function(req,res){
  if (req.session && req.session.user != undefined){
    var id = req.params.bookmark_id;
    var user = req.session.user;
    db.query('DELETE FROM bookmark WHERE title =' + db.escape(id) + 'AND username =' + db.escape(user) , function(err, bookmark){
      if(err){
        res.redirect('505.ejs');
        throw err;
        
      }
      res.redirect('/bookmarks');
    });
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

/**
 * Function to star/unstar a bookmark
 */
module.exports.star = function(req, res){
  if (req.session && req.session.user != undefined){
    var title = req.params.bookmark_title;
    var star = req.params.bookmark_star;

    if (star === '0'){
      db.query('update bookmark set star=1 where title =' + db.escape(title), function(err){
        if (err){
          res.redirect('505.ejs');
          throw err;
          
        }
        res.redirect('/bookmarks');
      });
    }
    else{
      db.query('update bookmark set star=0 where title =' + db.escape(title), function(err){
        if (err){
          res.redirect('505.ejs');
          throw err;
        }
        res.redirect('/bookmarks');
      });
    }
  }
  else{
    res.render('errors/error', {errorType : error.notLoggedIn});
  }
};

/**
 * Function to update the counter of the bookmark
 */
/* module.exports.counter = function(req, res){
   if (req.session && req.session.user != undefined){
      var title = req.params.bookmark_title;
      var username = req.params.bookmark_username;
     
      db.query('select url from bookmark where username = '+db.escape(username)+' and title ='+db.escape(title), function(err, url){
        if (err) {
          throw err;
        }
        else{
          var url = url[0].url;
          console.log("url target :"+url);
          //var win = this.open(url, '_blank');
          //win.focus();
          //res.redirect(url);
          db.query('select counter from bookmark where username='+db.escape(username)+' and title='+db.escape(title), function(err, counter){
            var counterNew = counter[0].counter+1;
            console.log("counterNew = "+counterNew);
            db.query('update bookmark set counter='+counterNew+' where title =' + db.escape(title)+' and username='+db.escape(username), function(err){
              if (err){
                res.redirect('505.ejs');
                throw err;
              }
              else{
                res.redirect('/bookmarks');
              }
            });
          });
        }
      });
      
   }
   else{
     res.render('errors/error', {errorType : error.notLoggedIn});
   }
};
*/
module.exports.counter = function(req, res){
   console.log("counter function called");
    var title = req.params.bookmark_title;
    var username = req.params.bookmark_username;
    /*var url = req.params.bookmark_url;
    var win = window.open(url, '_blank');
  	win.focus();*/
  	db.query('select url from bookmark where username = '+db.escape(username)+' and title ='+db.escape(title), function(err, url){
  	  if (err) {
  	    throw err;
  	  }
  	  else{
  	    var url = url[0].url;
  	    console.log("url target :"+url);
  	    //var win = this.open(url, '_blank');
  	    //win.focus();
  	    //res.redirect(url);
        db.query('select counter from bookmark where username='+db.escape(username)+' and title='+db.escape(title), function(err, counter){
      var counterNew = counter[0].counter+1;
      console.log("counterNew = "+counterNew);
      db.query('update bookmark set counter='+counterNew+' where title =' + db.escape(title)+' and username='+db.escape(username), function(err){
        if (err){
           res.render('/505.ejs');
          throw err;
         
        }
        else{
          res.redirect(url);
         //render('title', req, res);
          
        }
      });
    });
  	  }
  	});
    
};
var BookmarkIOService = require('./services/BookmarkIOService');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var upload = multer({
  dest: './public/uploads/'
}).single('filename');

/**
 * Exports a textfile that is named the name of the bookmark
 * @param req
 * @param res
 */
module.exports.exportBookmark = function(req, res) {
  // If there is no session do nothing
  // TODO: boot user back to sign in screen or notify of session lost
  if (!req.session) {
    //console.error('ERROR: No session');
    return;
  }
  var title = req.body.title;
  var username = req.session.user;
  BookmarkIOService.exportBookmark(username, title, function() {
    var filename = username + ' ' + title + ' export';
    if (fs.existsSync(filename)) {
      res.sendFile(__dirname + '/' + filename, null, function() {
        fs.unlink(filename);
      });
    }
  });
};

/**
 * Imports a textfile containing one bookmark into the database if
 * the user exists that is refrenced in the file
 */
module.exports.importBookmark = function(req, res) {
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
    BookmarkIOService.importBookmark(username, filename);
  });
  res.redirect('/bookmarks');

};


module.exports.importFolder = function(req, res) {
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

module.exports.exportFolder = function(req, res) {
 /* if (!req.session) {
    //console.error('ERROR: No session');
    return;
  }*/
  var username = req.session.user;
  var name = req.body.name;
  var filename = username + name + ' export';
  BookmarkIOService.exportFolder(username, name, function() {
    res.sendFile(filename);
  });
};


