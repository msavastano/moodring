var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');

// Friend Page
module.exports.index = function(req, res, next) {
  //console.log(req.decoded._doc._id);
  var fs = [];
  User
    .findById(req.decoded._doc._id, function(err, user){
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {

        User.find({}, function(err, users){
            users.forEach(function(u, i){

              user.friends.forEach(function(f, i){
                console.log(u._id);
                console.log(f);
                console.log("");
                if(u._id == f){
                  fs.push(u);
                }
              });
            });
            console.log(fs);
            res.render('friend_list', { title: 'Friends List',
                                        message: 'Welcome to',
                                        friendsmap: data.friends,
                                        user : user,
                                        friends : fs
                                      });
        });




      }


    });

};


var data = {
  friends : [{
    username : 'BobbyJoe',
    mood : '#1db715',
    _id:1
  },
  {
    username : 'SallieJane',
    mood : '#15acb7',
    _id:2
  },
  {
    username : 'BillieBob',
    mood : '#cd1b18',
    _id:3
  }]
};
