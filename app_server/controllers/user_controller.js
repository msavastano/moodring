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
  if(req.body.passwordverify == req.body.password){
    User.register(new User({ username : req.body.username, email : req.body.email}),
          req.body.password, function(err, user) {
            if (err) {
                //return res.status(500).json({err: err});
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
            //  if(req.body.email) {
            //      user.email = req.body.email;
            //  }
              user.save(function(err,user) {
                  passport.authenticate('local')(req, res, function () {
                      //return res.status(200).json({status: 'Registration Successful!'});
                      res.redirect('/users/login');
                  });
              });
            }
      });
  }else{
    //return res.status(200).json({status: 'passwords do not match'});
    res.render('register', { title: 'New Registration',
                          passwordError: 'passwords do not match',
                             message: 'Welcome to'
                           });
  }

}

module.exports.login_user = function(req, res, next){
  console.log("login_user");
  //console.log(req.body);
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
          //return res.status(500).json({
            //err: 'Could not log in user'
          //});
        }

        var token = Verify.getToken(user);
        //req.headers['x-access-token'] = token
        res.cookie('auth',token);

        res.redirect('/');
        /*res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token
        });*/

      });
    }
    //console.log(res);
  })(req,res,next);
};

//module.exports.refreshToken = function(req, res){
//var token = Verify.getToken(user);
  //req.headers['x-access-token'] = token
  //res.cookie('auth',token);
//}

module.exports.logout =  function(req, res) {
  res.clearCookie('auth');
  res.redirect('/users/login');
};

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
