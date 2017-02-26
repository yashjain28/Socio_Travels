var express = require('express');
var router = express.Router();
var fb = require('../public/javascripts/fb');
var constants = require("../integration/constants");
var twHelper = require('../public/javascripts/twilio');


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
  response.render('itenerary');
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


module.exports = router;
