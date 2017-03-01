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


module.exports.get_profile = function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    res.render('profile', {
          title: 'Demographics',
          nouser:req.decoded,
          user: user,
          saved : false
    });
  });
}

module.exports.edit_profile = function(req, res, next) {
  console.log("IN PROFILE PUT");
  console.log(req.body);
  User.findByIdAndUpdate(req['decoded']['_doc']['_id'], {
       $set: req.body
   }, {
       new: true
   }, function (err, user) {
       if (err) throw err;
       //res.json(user);
       //res.redirect('/profile');
       res.render('profile', {
             title: 'Demographics',
             nouser:req.decoded,
             user: user,
             saved : true
       });
   });
}
