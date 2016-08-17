var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');

// Friend List Page
module.exports.index = function(req, res, next) {
  var fs = [];
  User
    .findById(req.decoded._doc._id)
    .populate('friends')
    .exec(function(err, user){    
      res.render('friend_list', { title: 'Friends List',
                                  message: 'Welcome to',
                                  user : user,
                                  friends : user.friends,
                                  nouser:req.decoded
                                });
    });
};
