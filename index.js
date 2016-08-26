var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var request = require('request');
var async = require('async')
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  req.session.user = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  db.user.findById(req.user.dataValues.id).then(function(user){
    user.getSearches().then(function(searchTerm){
      res.render("profile", {searchTerm: searchTerm});
     });
  });
});

app.delete('/index/:id', function(req, res){
  console.log("INSIDE THE DELETE ROUTE!!!!");
  db.search.destroy({
  where: { 
    searchTerm: req.params.id,
    userId: req.session.user.id 
  }
  }).then(function() {
    console.log("INSIDE THEN PROMISE FROM DELETE ROUTE!");
    res.send(req.session.user);
  });
});

app.put('/profile/form/:name', function(req, res){
  console.log(req.body.dataObj);
  console.log("req.params.id",req.params.id);
  db.search.update({
  search: req.body.dataObj
}, {
  where: {
    searchTerm: req.params.id,
    userId: req.session.user.id 
  }
}).then(function(user) {
  // do something when done updating
});



  db.search.update(req.params.name, req.body);

  res.send({message: 'success'});
});

// , {team: team})
///Controllers and Listeners
var pagesCtrl = require("./controllers/pages")
app.use("/pages", pagesCtrl);

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
