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
  res.render('profile', {
        title: 'Profile Page'
  });
}
