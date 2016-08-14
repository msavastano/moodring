var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');
var moodmapper = require('./moodmapper');
var cloudinary = require('cloudinary');
var dateFormat = require('dateformat');




module.exports.get_mood_feed = function(req, res, next) {
  var friends;
  var frcomments = [];
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){
      //console.log(user.friends);
      friends = user.friends;
      friends.forEach(function(f, i){
        //console.log(f);
        User.findById(f._id)
          .populate('moods')
          .exec(function(err, fr){
            //console.log(fr.moods);
            fr.moods.forEach(function(m,i){
              //console.log(m);
              Moods.findById(m._id)
              .populate('comments.postedBy')
              .populate('comments.commentsOnComments.postedBy')
              .exec(function(err, md){
                //console.log(md.comments.length);
                frcomments.push(md.comments);
                frcomments.sort(function(a,b){
                  if (a.updatedAt > b.updatedAt) {
                      return 1;
                  }
                  if (a.updatedAt < b.updatedAt) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                });
                console.log(frcomments);
              });

            });
          });
      });

  });




  res.render('moodfeed', {
  });
};
