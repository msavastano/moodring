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
  var frcomments = [];

  var friendPlusMoods = [];
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){

        friends = user.friends;
        friends.forEach(function(f, fi){

            //console.log("FCOUNT "+fcount);
            User.findById(f._id)
              .populate('moods')
              .exec(function(err, f){
                /*f.moods.sort(function(a,b){
                  if (a.updatedAt > b.updatedAt) {
                    return -1;
                  }
                  if (a.updatedAt < b.updatedAt) {
                    return 1;
                  }
                  // a must be equal to b
                  return 0;
                });*/
                f.moods.forEach(function(m,i){
                  Moods.findById(m._id)
                  .populate('comments.postedBy') //{path:'comments.postedBy', options:{sort:{'createdAt':-1}}})
                  .populate('comments.commentsOnComments.postedBy')
                  .exec(function(err, md){

                    if(md.comments.length > 0){
                      var friendPlusMood = {};
                      friendPlusMood['friend'] = f;
                      friendPlusMood['mood'] = md;
                      //console.log(friendPlusMood);
                      frcomments.push(md);
                      friendPlusMoods.push(friendPlusMood);
                    }
                    console.log(friendPlusMoods);
                    console.log(frcomments);
                    if((fi+1) === friends.length && (i+1) == f.moods.length){
                      //console.log("IN");

                      res.render('moodfeed', {
                        frcomments : frcomments,
                        frPlusMoods : friendPlusMoods,
                        user : req.decoded._doc.username,
                        nouser:req.decoded
                      });


                     }
                  });

                });

              });
            });
          });

};
