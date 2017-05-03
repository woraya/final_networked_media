// latitude longtitude
// reture satellite images
var image_url;
var express = require('express');
var mongojs = require('mongojs');
var multer = require('multer');
var router = require('./app/routes');
var expressLayouts = require('express-ejs-layouts');
// var nodeNasa = require("node-nasa");

var requestify = require('requestify');
var session = require('express-session');
var nedbstore = require('nedb-session-store')(session);   // Session store


//data store
// var Datastore = require('nedb');
// var db = new Datastore({ filename: 'users.db', autoload: true });

var app = express();
var port = 7700;

// login
// take care of post variables in the route
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

app.use(
	session(
		{
			secret: 'secret',
			cookie: {
				 maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
				},
			store: new nedbstore({
			filename: 'sessions.db'
			})
		}
	)
);



var upload = multer();

//mongodb://<dbuser>:<dbpassword>@ds113650.mlab.com:13650/netmedia
// var db = mongojs("woraya:woofwoof0@ds145380.mlab.com:45380/osc", ["osc_settings"]);

///////////////////////////////////////////////////
// db.osc_settings.find({}, function(err, saved) {
//   if (err || !saved) {
//   	console.log("No results");
//   }
//   else {
//   	saved.forEach(function(record) {
//     	//  console.log(record);              // <----------- LONGASS DATA!!!!!!
//       image_url = record;
//   	});
//
//   // 	for (var i = 0; i < saved.length; i++) {
// 	//   	console.log(saved[i]);
// 	// }
//
//   }
// });
////////////////////////////////////////////////////

app.post('/', function(req, res) {
  res.json(image_url)
});

// route my app
app.use(router);

// use ejs & express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use static files (css, imgs)
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('The Magic Happens on port: ' + port);
});
