var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');

// Friend List Page
module.exports.index = function(req, res, next) {
  var fs = [];
  User
    .findById(req.decoded._doc._id, function(err, user){
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {

        User.find({}, function(err, users){
            users.forEach(function(u, i){

              user.friends.forEach(function(f, i){
                if(String(u._id) == String(f)){
                  fs.push(u);
                }
              });
            });
            res.render('friend_list', { title: 'Friends List',
                                        message: 'Welcome to',
                                        user : user,
                                        friends : fs,
                                        nouser:req.decoded
                                      });
        });
      }
    });
};
