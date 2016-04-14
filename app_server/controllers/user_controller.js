var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users');


module.exports.register_user = function(req, res, next){
  console.log("register_user");
  Users.create(req.body, function (err, user) {
        if (err) throw err;
        console.log('User created!');
        var id = user._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the user with id: ' + id);
    });
};
