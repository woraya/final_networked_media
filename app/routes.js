var express = require('express');     // require expressss
var path = require('path');
var requestify = require('requestify');
var mongojs = require('mongojs');
var router = express.Router();        // create router
module.exports = router;              // export my router


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  // res.render('pages/index');
});

// database mongo 360 image
var db = mongojs("woraya:woofwoof0@ds145380.mlab.com:45380/osc", ["osc_settings"]);
var imageUrl;

// router.post('/', function(req, res) {
//   db.osc_settings.find({}, function(err, saved) {
//     if (err || !saved) {
//     	console.log("No results");
//     }
//     else {
//     	saved.forEach(function(record) {
//       	console.log(record);
//         res.json(record);
//     	});
//     // 	for (var i = 0; i < saved.length; i++) {
//   	//   	console.log(saved[i]);
//   	// }
//     }
//   });

  // var lon = req.body.in_long;     // 105.75
  // console.log(lon) ;
  //
  // var lat = req.body.in_lat;      // 1.5
  // console.log(lat);
  //
  // var inputDate2 = new Date(req.body.in_when.replace(/-/g,","));
  // console.log(inputDate2);
  //
  // var cloudScore = 'True';
  // var key = '51wchmkmVucm7c3e1gfe8epYWKeSKrDiA2faaSmz';

  // work fine =========================================================
    // var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + key;

    // requestify.get(apiUrl)
    //   .then(function(response){
    //   var imageUrl = response.getBody().url;
    //   console.log(imageUrl);
    //   // send back to webpage
    //   res.send("<img src=" + imageUrl + "></img>");
    //  });
  // ====================================================================

//   function dateFormatter(aDate) {
//         //YYYY-MM-DD
//         var year = aDate.getUTCFullYear();
//         var month = aDate.getUTCMonth();
//         month++;                                // months begin at 0 for some reason
//         if (month < 10) {
//                 month = "0" + month;            // add a leading 0
//         }
//         var day = aDate.getUTCDate()
//         if (day < 10) {
//                 day = "0" + day;                // add a leanding 0
//         }
//         return year + "-" + month + "-" + day;  // return in YYYY-MM-DD format
// }

router.get('/saved', function(req, res) {
  db.osc_settings.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
      res.send("nothing");
    }
    else {
    	saved.forEach(function(record) {
      	//  console.log(record);              // <----------- LONGASS DATA!!!!!!
        // image_url = record;
        // res.send(record);
      });

      for (var i = 0; i < saved.length; i++) {
        // console.log(saved[0]);
      }
      console.log(saved.length);
      res.send(saved[0])
    }
  });

  // db.osc_collection.findOne({
  //     _id: mongojs.ObjectId("58e492eab88ae4c5a531df80")
  // }, function(err, record) {
  //     // console.log(record);
  //     res.send(record);
  //     // res.json(record);
  // });
});

////////////////////////////////////////////////
// nasa sattelite images
// first create an empty array
var images = [];

// Display last 30 days, notice that date math is correct, minusing the month at the appropriate point
// var aDate = new Date();
// aDate = inputDate2;
// for (var i = 10; i > 0; i--) {
//         aDate.setDate(aDate.getDate() - 16);
//         var date_modified = dateFormatter(aDate);
//         console.log(date_modified);
//         findImage(date_modified);
// }

  // define your requestify function
//   function findImage(_aDate){
//       // find your current date and subtract 20 days from iteration
//       var apiUrl = 'https://api.nasa.gov/planetary/earth/imagery?lon=' + lon + '&lat=' + lat + '&date=' + _aDate + '&cloud_score' + cloudScore + '&api_key=' + key;
//       console.log("apiUrl: " + apiUrl)
//
//       requestify.get (apiUrl)
//         .then(function (response) {
//         imageUrl = response.getBody();
//         console.log(imageUrl);
//
//         // send back to webpage
//         images.push(imageUrl);
//
//         if(images.length == 10){
//           res.json(images);
//           // res.send("<img src=" + imageUrl + "></img>");
//           // console.log(images);
//         }
//     });
//   }
// });
////////////////////////////////////////////////

// /saved?id=laksdjflkasjdfklj


// router.get('/result', function(req, res) {
//   res.sendFile(path.join(__dirname, '/result.html'));
//   // res.send("<img src=" + imageUrl + "></img>");
//   // res.render('views/result');
// });

// router.get(function(req, res, next) {
//   res.sendFile(path.join(__dirname, '/404.html'));
//   // res.render('pages/404');
// });
//
// router.post('/register', function(req, res) {
// 	// We want to "hash" the password so that it isn't stored in clear text in the database
// 	var passwordHash = generateHash(req.body.password);
//
// 	// The information we want to store
// 	var registration = {
// 		"username": req.body.username,
// 		"password": passwordHash
// 	};
//
// 	// Insert into the database
// 	db.insert(registration);
// 	console.log("inserted " + registration);
//
// 	// Give the user an option of what to do next
// 	res.send("Registered Sign In" );
//
// });
//
//
// router.get('/poemList', function(req, res) {
//   res.json({message: 'i am the poem list page'})
// });
