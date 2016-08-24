var express = require("express");
var router = express.Router();
var request = require('request');
var async = require('async');
var db = require('../models');



//Search and results Routes
router.get("/results", function(req, res) {
  var searchTerm = req.query.search;

  ///////API REQUEST FUNCTIONS!!!
  function guardian(callback){
    request({
      url: 'http://content.guardianapis.com/search',
      qs: {
      'api-key': "a8d459cf-2a88-4dc8-b62c-a4913e0b7bb7",
      'q': searchTerm
      }
    },function(error, response, body){
      if(!error && response.statusCode == 200){
        var guardianData = JSON.parse(body);
        callback(null, guardianData.response.results[0]);
      }
    });
  }
  function nyTimes(callback){
    request({
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      qs: {
      'api-key': "a67bf00f73074416973aeece50e62613",
      'q': searchTerm
      }
    },function(error, response, body){
      if(!error && response.statusCode == 200){
        var nyTimesData = JSON.parse(body);
        callback(null, nyTimesData.response.docs[0]);
      }
    });
  }
  
  ////////////ASYNC
  async.series([guardian, nyTimes], function(err, results) {
    console.log(results[0]);
    res.render('pages/results', {guardian: results[0], nyTimes: results[1]});
  });
}); 



router.get("/election", function(req, res){
  ///Election 2016 page
});


module.exports = router;