var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');

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

module.exports.new_comment = function(req, res, next){
  Moods.findById(req.params.moodid, function (err, mood){
    User.findById(req.params.userid)
     .exec(function (err, user){
      if (err) throw err;
      req.body.postedBy = req.decoded._doc._id;
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
