var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Verify    = require('./verify');
var User = require('../models/users');
var request = require('request');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport")
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

module.exports.get_forgot = function(req, res) {
  res.clearCookie('auth');  
  res.render('forgot', {
    user: req.user
  });
}

module.exports.reset = function(req, res){

    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('back');
      }
      if(req.body.password == req.body.confirm){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.setPassword(req.body.password, function(err, user) {
          user.save(function(err) {
            res.redirect('/users/login');
          });
        });
      }else{
        res.render('reset', {
              passwordError: 'passwords do not match'
        });
      }
    });
}

module.exports.get_reset = function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/users/forgot');
    }
    res.render('reset', {
      passwordError: '',
      user: req.user
    });
  });
}

module.exports.forgot = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/users/login');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var sgriduser;
      var sgridpass;
      if (app.get('env') === 'development') {
        var sg = require('../../sendgrid');
        sgriduser = sg.username;
        sgridpass = sg.password;
      }else{
        sgriduser = process.env.SENDGRID_USERNAME;
        sgridpass = process.env.SENDGRID_PASSWORD;
      }
      var smtpTransporter = nodemailer.createTransport(smtpTransport({
        service: 'SendGrid',
        auth : {
          user : sgriduser,
          pass : sgridpass
        }
      }));
      var mailOptions = {
        to: user.email,
        from: 'donotreply@moodRing.com',
        subject: 'moodRing Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransporter.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions. It should arrive shortly');
        res.redirect('/users/login');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/users/login');
  });
}

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
              user.pic = 'http://res.cloudinary.com/hc8sjgb90/image/upload/v1469932937/ddgx83q76t8fqcdwhssg.jpg';
              user.save(function(err,user) {
                  passport.authenticate('local')(req, res, function () {
                      //res.redirect('/users/login');
                      req.logIn(user, function(err) {
                        if (err) {
                          res.redirect('/users/login');
                        }
                        var token = Verify.getToken(user);
                        res.cookie('auth',token);
                        res.redirect('/');
                      });
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
