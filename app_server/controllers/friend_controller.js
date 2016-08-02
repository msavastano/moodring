var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var moodmapper = require('./moodmapper');


// add a friend button
module.exports.addFriend =  function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    // if user id determine what it does
    var indexFriend = user.friends.indexOf(req.params.friendid)
    if(indexFriend == -1){
      if(err) throw err
      user.friends.push(req.params.friendid);
    }else{
      user.friends.splice(indexFriend, 1);
    }
    user.save(function(err,user) {
      res.redirect('/friend/'+req.params.friendid);
    });
  });

};

// get the Friend Page
module.exports.index = function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'])
    .populate('friends')
    .exec(function(err, user){
      User.findById(req.params.friendid, function(err, friend){
        var friendBtn = false;
        var friendpic = friend.pic;
        if(friend.pic === ''){
          friendpic = 'http://res.cloudinary.com/hc8sjgb90/image/upload/v1469932937/ddgx83q76t8fqcdwhssg.jpg';
        }
        user.friends.forEach(function(f, i){
          if(String(f._id) == String(friend._id)) friendBtn = true;
        });
        var friendBtnStr = "";
        // if user id determine what is on button
        if(friendBtn){
          friendBtnStr = "Remove Friend";
        }else{
          friendBtnStr = "Add Friend";
        }
        if (err) throw err
        var fmoods = friend.moods;
        var cm;
        fmoods.forEach(function(m, i){
          Moods.findById(m)
          .populate('comments.postedBy')
          .populate('comments.commentsOnComments.postedBy')
          .exec(function(err, md){
            if(md.latestMood == true){
              cm = md;
              res.render('friend', { title: friend.username+'\'s Page',
                                    message: 'Welcome to',
                                    moodMap: moodmapper.moodMap.moods,
                                    user : req.decoded._doc.username,
                                    fr : friend,
                                    userid : friend._id,
                                    lastestFrMood:cm,
                                    currMood : cm,
                                    frBtnStr : friendBtnStr,
                                    nouser:req.decoded,
                                    userpic:friendpic
                                });
            }
        });
      });
    });
  });
};
