var express = require("express");
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get("/search", function(req, res) {
 res.render('pages/search');
});

router.post('/search', function(req, res){
  //this is where search words will be searched for useing the apis and user
  //will be redirected to the results page
  console.log(req.body);
});

router.get("/results", function(req, res){
  //this is where I'll render the results page
});

router.get("/election", function(req, res){
  ///Election 2016 page
});


module.exports = router;