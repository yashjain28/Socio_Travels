var express = require('express');
var router = express.Router();
var fb = require('../public/javascripts/fb');
var constants = require("../integration/constants");
var twHelper = require('../public/javascripts/twilio');
var key='xFxTgyQg2Np4qv009WGx2ntuPAg4FQRe';
var http = require('http');


router.get('/', function(request, response, next) {
  response.render('signup');
});

router.get('/login', function(request, response, next) {
  response.render('login');
});

router.get('/detailsEntry', function(request, response, next) {
  response.render('detailsEntry');
});

router.get('/itenerary', function(request, response, next) {
  var source2 = request.query.source;
  console.log(source2);
  response.render('itenerary');
  //response.redirect('flighturl');
});

router.get('/ngo', function(request, response, next) {
  response.render('ngo');
});


router.get('/fbo', function(request, response, next) {
  fb.getFbData(constants.AccessToken, "&", 'me?fields=id', function(userID_data){
    console.log(userID_data);

    var parsedData =   JSON.parse(userID_data);
    var user_id = parsedData["id"];
    console.log(user_id);
    fb.getFbData(constants.AccessToken, "&", user_id+'/likes?limit=99', function(data){
      response.send(data);
    });
  });
});

router.get('/sendMessage', function(req, res, next){
  console.log('as');
  twHelper.sendMsg2(function () {
    res.render('index', {title: 'Express hain yehi!'});
  });
});


router.get('/flighturl', function(req, res, next) {
  var apiused= 'flights/extensive-search';
  var source = req.query.source;
  var dest = req.query.destination;

  console.log('ye wala');
  console.log(source);
  console.log(dest);
  var deptdaterange = '2017-07--2017-09';
  var duration = '2';


  var temp = apiused + '?origin=' + source + '&destination=' + dest + '&departure_date=' + deptdaterange + '&duration=' + duration + '&apikey=' + key;
  var options = 'http://api.sandbox.amadeus.com/v1.2/' + temp;
  var request = http.get(options, function (response) {
    response.setEncoding('utf8');
    var chunky='';
    response.on('data', function (chunk) {
      chunky += chunk;
      console.log(chunky);
    });
    response.on('end', function () {
      var data = JSON.parse(chunky);
      res.send(data);
    });

    response.on('error', function (err) {
      console.log(err);
    })
  });

});

router.get('/hotelurl', function(req, res, next) {
  var apiused='hotels/search-airport'
  var location ='BOS'
  var check_in='2017-03-16';
  var check_out='2017-04-14';
  var no_of_result=5;
  var temp=apiused+'?apikey='+key+'&location='+location+'&check_in='+check_in+'&check_out='+check_out+'&amenity=RESTAURANT&amenity=PARKING&number_of_results='+no_of_result;
  var options ='http://api.sandbox.amadeus.com/v1.2/'+temp;
  //https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=YOUR_API_KEY_HERE&location=BOS
  //
  var request = http.get(options, function (response) {
    response.setEncoding('utf8');
    var chunky='';
    //console.log('STATUS: ' + response.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(response.headers));
    //console.log(response);
    response.on('data', function (chunk) {
      //console.log(chunk);
      chunky += chunk;
      console.log(chunky);
      // res.send(chunky);
    });
    response.on('end', function () {
      var data = JSON.parse(chunky);

      res.send(data.results);
    });
  });
});

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


module.exports = router;
