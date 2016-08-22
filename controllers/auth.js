var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  db.user.findOrCreate({
    defaults: {
      where:{email: req.body.email},
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created){
    if(created){
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    }else{
      request.flash('error','Email already exists');
      res.redirect('/auth/signup')
    }
  }).catch(function(error){
    request.flash('error','an error occured:' + error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'you logged in'
}));

router.get('/logout', function(req, res){
  req.logout();
  req.flash('succes', 'logged out');
  res.redirect('/');
});

module.exports = router;










