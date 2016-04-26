var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');

//'/:moodid/comment/:commentid/commentoncomment/new'
module.exports.new_comment_on_comment = function(req, res, next){
  Moods.findById(req.params.moodid, function (err, mood){
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
      res.redirect('/');
    });
  });
};

module.exports.index = function(req, res, next){
    res.render('comment_on_comment', { title: 'New Comment on Comment',
                        message: 'Welcome to'});

};
