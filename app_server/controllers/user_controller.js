var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Verify    = require('./verify');
var User = require('../models/users');
var request = require('request');
var fs = require('fs');

// save user to DB
module.exports.register_user = function(req, res, next){
  console.log("register_user");
  console.log(req.body);
  if(req.body.passwordverify == req.body.password){
    User.register(new User({ username : req.body.username, email : req.body.email}),
          req.body.password, function(err, user) {
            if (err) {
                res.render('register', { title: 'New Registration',
                                      passwordError: err,
                                         message: 'Welcome to'
                                       });
            }else{
              if(req.body.firstname) {
                  user.firstname = req.body.firstname;
              }
              if(req.body.lastname) {
                  user.lastname = req.body.lastname;
              }
              user.save(function(err,user) {
                  passport.authenticate('local')(req, res, function () {
                      res.redirect('/users/login');
                  });
              });
            }
      });
  }else{
    res.render('register', { title: 'New Registration',
                          passwordError: 'passwords do not match',
                             message: 'Welcome to'
                           });
  }
}

// Login function
module.exports.login_user = function(req, res, next){
  console.log("login_user");

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.render('login', { title: 'Login',
                            message: 'Username or Password is incorrect'});
    }else{
      req.logIn(user, function(err) {
        if (err) {
          res.redirect('/users/login');
        }
        var token = Verify.getToken(user);
        res.cookie('auth',token);

        res.redirect('/');
      });
    }
  })(req,res,next);
};

module.exports.photo_page = function(req, res, next){
  res.render('photo', { title: 'Login',
                        message: 'Username or Password is incorrect'});
};

module.exports.photo_upload = function(req, res, next){
  console.log(req);
  fs.readFile(req.files.image.path, function (err, data) {
    var imageName = req.files.image.name
    // If there's an error
    if(!imageName){
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {
      var newPath = __dirname + "/uploads/fullsize/" + imageName;
      // write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
        // let's see it
        res.redirect("/uploads/fullsize/" + imageName);
      });
    }
  });
};

// clear the cookie that holds token
module.exports.logout =  function(req, res) {
  res.clearCookie('auth');
  res.redirect('/users/login');
};

// Get user pages
module.exports.login_page = function(req, res, next){
  console.log("login_page");
  res.render('login', { title: 'Login',
                        message: 'Welcome',
                        nouser:req.decoded
                      });
};
module.exports.register_page = function(req, res, next){
  console.log("register_page");
  res.render('register', { title: 'New Registration',
                          message: 'Welcome to',
                          passwordError:'',
                          nouser:req.decoded
                        });
};
