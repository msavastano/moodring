var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Verify    = require('./verify');
var User = require('../models/users');
var request = require('request');


module.exports.register_user = function(req, res, next){
  console.log("register_user");
  console.log(req.body);
  User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        if(req.body.email) {
            user.email = req.body.email;
        }
        user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
}

module.exports.login_user = function(req, res, next){
  console.log("login_user");
  //console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        res.redirect('/login');
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      //req.headers['x-access-token'] = token
      res.cookie('auth',token);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });

    });
    console.log(res);
  })(req,res,next);
};

module.exports.login_page = function(req, res, next){
  console.log("login_page");
  res.render('login', { title: 'Login',
                        message: 'Welcome to'});
};

module.exports.register_page = function(req, res, next){
  console.log("register_page");
  res.render('register', { title: 'New Registration',
                        message: 'Welcome to'});
};
