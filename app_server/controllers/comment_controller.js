var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');

// get comment screen
module.exports.index = function(req, res, next) {
  Moods.findById(req.params.moodid)
   .exec(function (err, mood){
     User.findById(req.params.userid)
      .exec(function (err, user){
        res.render('comment', { title: 'Comment',
                            message: 'Welcome to',
                            mood:mood,
                            user:user
                          });
    });
  });
};

// post a new comment
module.exports.new_comment = function(req, res, next){
  Moods.findById(req.params.moodid, function (err, mood){
    User.findById(req.params.userid)
     .exec(function (err, user){
      if (err) throw err;
      req.body.postedBy = req.decoded._doc._id;
      console.log("BODY "+ stringify(req.body));
      mood.comments.push(req.body);
      mood.save(function (err, dish) {
        if (err) throw err;
        if(req.params.userid == req.decoded._doc._id){
          res.redirect('/');
        }else{
          res.redirect('/friend/'+req.params.userid);
        }
      });
    });
  });
};
