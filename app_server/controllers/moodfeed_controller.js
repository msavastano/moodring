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
  var allComments = [];
  var fids = [];
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){
      if(user.friends.length == 0){
        res.redirect('/searchfriends');
      }
      user.friends.forEach(function(f, fi){
        User.findById(f._id)
          .populate('moods')
          .populate('moods.comments.postedBy')
          .populate('moods.comments.commentsOnComments.postedBy')
          .exec(function(err, f){
            f.moods.forEach(function(mo,i){
              Moods.findById(mo._id)
              .populate('comments.postedBy')
              .populate('comments.commentsOnComments.postedBy')
              .exec(function(err, m){
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
                  for (i = 0; i < friendPlusMoods.length; i++) {
                    for (j = 0; j < friendPlusMoods[i]['mood']['comments'].length; j++) {
                      friendPlusMoods[i]['mood']['comments'][j]['friend'] = friendPlusMoods[i]['friend']['username'];
                      friendPlusMoods[i]['mood']['comments'][j]['pic'] = friendPlusMoods[i]['friend']['pic'];
                      friendPlusMoods[i]['mood']['comments'][j]['friendid'] = friendPlusMoods[i]['friend']['_id'];
                      allComments.push( friendPlusMoods[i]['mood']['comments'][j] );
                    }
                  }
                  console.log(allComments[2]);
                  res.render('moodfeed', {
                    allComments:allComments,
                    user : req.decoded._doc.username,
                    nouser:req.decoded,
                    userpic:req.decoded._doc.pic
                  });
                }
            });
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
