var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');

// post a new comment on comment
module.exports.new_comment_on_comment = function(req, res, next){
  Moods.findById(req.params.moodid)
      .exec(function (err, mood){
        User.findById(req.params.userid)
       .exec(function (err, user){
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        mood.comments.forEach(function(c, i){
          console.log("c._id "+c._id);
          console.log("req.params.commentid "+req.params.commentid);
          if(c._id == req.params.commentid){
            c.commentsOnComments.push(req.body);
          }
        });
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

// get comment on comment screen
module.exports.index = function(req, res, next){
  Moods.findById(req.params.moodid)
      .exec(function (err, mood){
        var forComment;
        mood.comments.forEach(function(c,i){
          console.log(c._id);
          console.log(req.params.commentid);
          if(String(c._id) == String(req.params.commentid)){
            forComment = c;
          }
      });
      res.render('comment_on_comment', {
                        title: 'New Comment on Comment',
                        message: 'Welcome to',
                        c:forComment
      });
  });
};
