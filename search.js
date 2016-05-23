/* Basic search bar implementation */

/* Open connections to database */
var config = require('./config');
var db = require('./db');
var md5 = require('./md5');

module.exports.search = function (req, res){
	
	// if(req.body.trim() != ""){

		//Fetch search fields
		var searchTitle = req.body.title;
		var searchUrl = req.body.url;

		//Search database for values
		var sql = 'SELECT * FROM bookmark WHERE title LIKE "%' + db.escape(searchTitle) + 
		'%"" OR url LIKE "%' + db.escape(searchUrl) +'%"';

		db.query(sql, function(err, results){
			if(err){
				throw(err);
			}
			else{
				//Check that there is queried data 
				if(results.length > 0){
					//Put return data from db into console
					for(i = 0; i < results.length; i++){
						console.log(results[i].title);
						console.log(results[i].url);
					}
					var json = JSON.stringify(results);
					res.render('search/searchSuccess', )

				}
				else{
					//Render an error message: no matching result
					res.render('search/noMatch');
				}

			}
		}

}

	//}




