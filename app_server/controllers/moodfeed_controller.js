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
  var allMoodsCount = 0;
  var allMoodsCounter = 0;
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){
      if(user.friends.length == 0){
        res.redirect('/searchfriends');
      }
      for(uf = 0; uf < user.friends.length; uf++){
        User.findById(user.friends[uf]._id)
          .populate('moods')
          .exec(function(err, f){
            allMoodsCount = allMoodsCount + (f.moods.length);
            for(fm = 0; fm < f.moods.length; fm++){
              Moods.findById(f.moods[fm]._id)
              .populate('comments.postedBy')
              .populate('comments.commentsOnComments.postedBy')
              .exec(function(err, m){
                allMoodsCounter++;
                if(m.comments.length > 0){
                  var friendPlusMood = {};
                  friendPlusMood['friend'] = f;
                  friendPlusMood['mood'] = m;
                  friendPlusMoods.push(friendPlusMood);
                }
                console.log("allMoodsCount "+allMoodsCount);
                console.log("allMoodsCounter "+allMoodsCounter);
                if(allMoodsCounter == allMoodsCount){
                  console.log("****************RENDERED****************");
                  for (i = 0; i < friendPlusMoods.length; i++) {
                    for (j = 0; j < friendPlusMoods[i]['mood']['comments'].length; j++) {
                      friendPlusMoods[i]['mood']['comments'][j]['friend'] = friendPlusMoods[i]['friend']['username'];
                      friendPlusMoods[i]['mood']['comments'][j]['pic'] = friendPlusMoods[i]['friend']['pic'];
                      friendPlusMoods[i]['mood']['comments'][j]['friendid'] = friendPlusMoods[i]['friend']['_id'];
                      allComments.push( friendPlusMoods[i]['mood']['comments'][j] );
                    }
                  }
                  res.render('moodfeed', {
                    allComments:allComments,
                    user : req.decoded._doc.username,
                    nouser:req.decoded,
                    userpic:req.decoded._doc.pic
                  });
                }
            });
           }
          });
         }
      });
};

/*
 f.moods.sort(function(a,b){
    if (a.ownerid < b.ownerid) {
      return -1;
    }
    if (a.ownerid > b.ownerid) {
      return 1;
    }
    // a must be equal to b
    return 0;
 });
*/
