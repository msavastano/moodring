var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');

module.exports.index = function(req, res, next) {
  res.render('comment', { title: 'New Comment',
                        message: 'Welcome to'});

};

module.exports.new_comment = function(req, res, next){
  Moods.findById(req.params.moodid, function (err, mood){
    if (err) throw err;
    req.body.postedBy = req.decoded._doc._id;
    mood.comments.push(req.body);
    mood.save(function (err, dish) {
      if (err) throw err;
      res.redirect('/');
    });
  });
};
