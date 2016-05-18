var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');

// add a friend button
module.exports.addFriend =  function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    // if user id determine what it does
    if(user.friends.indexOf(req.params.friendid) == -1){
      if(err) throw err
      user.friends.push(req.params.friendid);
    }else{
      user.friends.pop(req.params.friendid);
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
        user.friends.forEach(function(f, i){
          console.log(f._id);
          console.log(friend._id);
          if(String(f._id) == String(friend._id)) friendBtn = true;
          console.log(friendBtn);
        });
        var friendBtnStr = "";
        // if user id determine what is on button
        if(friendBtn){
          friendBtnStr = "Remove Friend";
        }else{
          friendBtnStr = "Add Friend";
        }
        console.log(friendBtnStr);
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
                                    moodMap: moodMap.moods,
                                    user : req.decoded._doc.username,
                                    fr : friend,
                                    lastestFrMood : cm,
                                    frBtnStr : friendBtnStr,
                                    nouser:req.decoded
                                });
            }
        });
      });
    });
  });
};

var moodMap = {
  moods:
    [{
        label:'Stressed',
        colorHex:'#000000',
        colorName:'black',
        fontHex:'#ffffff'
    },
    {
        label:'Nervous',
        colorHex:'#cd1b18',
        colorName:'red',
        fontHex:'#000000'
    },
   {
        label:'Unsettled',
        colorHex:'#cd6718',
        colorName:'orange',
        fontHex:'#000000'
    },
    {
        label:'Active',
        colorHex:'#1db715',
        colorName:'green',
        fontHex:'#000000'
    },
    {
        label:'Relaxed',
        colorHex:'#15acb7',
        colorName:'light-blue',
        fontHex:'#000000'
    },
    {
        label:'Lovable',
        colorHex:'#15b773',
        colorName:'blue-green',
        fontHex:'#000000'
    },
    {
        label:'Romantic',
        colorHex:'#180f80',
        colorName:'dark-blue',
        fontHex:'#ffffff'
    },
    {
        label:'Happy',
        colorHex:'#f6b1b1',
        colorName:'pink',
        fontHex:'#000000'
    }
  ]
};
