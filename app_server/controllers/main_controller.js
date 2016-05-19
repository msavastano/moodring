var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');

// User Homepage
module.exports.index = function(req, res, next) {

  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    if (err) throw err
    var umoods = user.moods;
    var cm;
    if(umoods.length == 0){
      // render a screen for picking first mood
      res.render('pick_first_mood', { title: 'My mood',
                            message: 'Welcome to',
                            moodMap: moodMap.moods,
                            userid : req.decoded._doc._id,
                            user : req.decoded._doc.username,
                            nouser:req.decoded
                        });
    }else{
      umoods.forEach(function(m, i){
        Moods.findById(m)
          .populate('comments.postedBy')
          .populate('comments.commentsOnComments.postedBy')
          .exec(function(err, md){
          var foundOldMood = false;
          // bug - if no latest mood is found it does nothing
          if(md.latestMood == true){
            foundOldMood = true
            cm = md;
            res.render('index', { title: 'My Page',
                                  message: 'Welcome to',
                                  moodMap: moodMap.moods,
                                  user : req.decoded._doc.username,
                                  userid : req.decoded._doc._id,
                                  currMood : cm,
                                  nouser:req.decoded
                              });
        }
      });
    });
   }
  });
};

// This will render the old mood picked from the old moods list
module.exports.old_mood = function (req, res, next) {
  Moods.findById(req.params.moodid)
  .populate('comments.postedBy')
  .populate('comments.commentsOnComments.postedBy')
  .exec(function(err, md){
    res.render('old_mood', { title: 'Old Mood',
                          moodMap: moodMap.moods,
                          md:md,
                          nouser:req.decoded
                      });

  });
};

// this puts together a list of old moods
module.exports.old_moods = function (req, res, next) {
  User.findById(req['decoded']['_doc']['_id'])
      .populate('moods')
      .exec(function(err, user){
        var oldMoods = [];
        user.moods.forEach(function(m, i){
          if(m.latestMood == false){
            oldMoods.push(m);
          }
        });
        res.render('old_moods', { title: 'Old Moods',
                              moodMap: moodMap.moods,
                              user : user,
                              oMoods:oldMoods,
                              nouser:req.decoded
                          });
  });
};

// get the search screen
module.exports.searchFriends = function(req, res, next){
  res.render('search_friends', { title: 'Search Friends',
                        message: 'Welcome to',
                        moodMap: moodMap.moods,
                        user : req.decoded._doc.username,
                        finds : [],
                        nouser:req.decoded
                    });
};

// get friends based on search string
module.exports.findFriends = function(req, res, next){
  var keyword = req.body.friend;
  var matches = [];
  User.find({}, function(err, users){
    users.forEach(function(u, i){
      if(u._id != req.decoded._doc._id){
        if(u.username.search(keyword) != -1){
          matches.push(u);
        }else if(u.firstname.search(keyword) != -1){
          matches.push(u);
        }else if(u.lastname.search(keyword) != -1){
          matches.push(u);
        }
      }
    });
    res.render('search_friends', { title: 'Search Friends',
                          message: 'Welcome to',
                          user : req.decoded._doc.username,
                          key : keyword,
                          finds : matches,
                          nouser:req.decoded
                      });
  });
};

// Create a new mood
module.exports.new_mood = function(req, res, next){
  if(req.decoded._doc._id){
    User
      .findById(req.decoded._doc._id, function(err, user){
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {

          Moods.create(req.body, function (err, mood) {
            if (err) throw err;
            var m;
            user.moods.forEach(function(m, i){
              Moods.findById(m, function(err, md){
                if (err) throw err;
                if(m != md){
                  md.latestMood = false;
                }
                md.save(function(err, location) {
                  if (err) throw err;
                });
              });
            });
            mood.label = req.body.label;
            user.moods.push(mood._id);
            user.save(function(err, user){
            res.redirect('/');
            });
          });
        }
      });
  }
};



var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
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
