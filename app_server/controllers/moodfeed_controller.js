var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');
var moodmapper = require('./moodmapper');
var cloudinary = require('cloudinary');
var dateFormat = require('dateformat');
var async = require('async');


module.exports.get_mood_feed = function(req, res, next) {
  var friends;
  var friendPlusMoods = [];
  var fids = [];
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){
      user.friends.forEach(function(f, fi){
        User.findById(f._id)
          .populate('moods')
          .exec(function(err, f){
            f.moods.forEach(function(m,i){
              if(m.comments.length > 0){
                var friendPlusMood = {};
                friendPlusMood['friend'] = f;
                friendPlusMood['mood'] = m;
                friendPlusMoods.push(friendPlusMood);
              }
              if(fids.indexOf(f._id) == -1){
                fids.push(f._id);
              }              
              if(fids.length == user.friends.length && (i+1) == f.moods.length){
                console.log("RENDERED");
                res.render('moodfeed', {
                  frPlusMoods : friendPlusMoods,
                  user : req.decoded._doc.username,
                  nouser:req.decoded
                });
              }
            });
          });
        });
      });
};

/*  f.moods = f.moods.sort(function(a,b){
    if (a.postedBy < b.postedBy) {
      return -1;
    }
    if (a.postedBy > b.postedBy) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
*/
