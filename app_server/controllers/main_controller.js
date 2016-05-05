var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');

// Homepage
module.exports.index = function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    //console.log(req);
    if (err) throw err
    var umoods = user.moods;
    var cm;
    if(umoods.length == 0){
      res.render('pick_first_mood', { title: 'My Page',
                            message: 'Welcome to',
                            moodMap: moodMap.moods,
                            user : req.decoded._doc.username
                        });
    }else{
      umoods.forEach(function(m, i){
        Moods.findById(m)
          .populate('comments.postedBy')
          .populate('comments.commentsOnComments.postedBy')
          .exec(function(err, md){
          if(md.latestMood == true){
            cm = md;
            //console.log(cm.comments);
            res.render('index', { title: 'My Page',
                                  message: 'Welcome to',
                                  moodMap: moodMap.moods,
                                  user : req.decoded._doc.username,
                                  currMood : cm
                              });

        }
      });

    });
  }
  });
};

module.exports.old_mood = function (req, res, next) {
  Moods.findById(req.params.moodid)
  .populate('comments.postedBy')
  .populate('comments.commentsOnComments.postedBy')
  .exec(function(err, md){
    res.render('old_mood', { title: 'Old Mood',
                          moodMap: moodMap.moods,                          
                          md:md
                      });

  });
};

module.exports.old_moods = function (req, res, next) {
  User.findById(req['decoded']['_doc']['_id'])
      .populate('moods')
      .exec(function(err, user){
        var oldMoods = [];
        //console.log(user.moods);
        user.moods.forEach(function(m, i){

          if(m.latestMood == false){
            oldMoods.push(m);
          }

        });
        res.render('old_moods', { title: 'Old Moods',
                              moodMap: moodMap.moods,
                              user : user,
                              oMoods:oldMoods
                          });
  });
};

module.exports.searchFriends = function(req, res, next){
  res.render('search_friends', { title: 'Search Friends',
                        message: 'Welcome to',
                        moodMap: moodMap.moods,
                        user : req.decoded._doc.username,
                        finds : []
                    });
};

module.exports.findFriends = function(req, res, next){
  var keyword = req.body.friend;
  var matches = [];
  /*
    username
    firstname
    lastname
  */
  User.find({}, function(err, users){
    //console.log(users);
    users.forEach(function(u, i){
      //console.log(u.username.search(keyword));
      if(u._id != req.decoded._doc._id){
        if(u.username.search(keyword) != -1){
          //console.log(u.username);
          //keyword = keyword + " username"
          matches.push(u);
        }else if(u.firstname.search(keyword) != -1){
          matches.push(u);
        }else if(u.lastname.search(keyword) != -1){
          matches.push(u);
        }
      }
    });
    //console.log(matches);
    res.render('search_friends', { title: 'Search Friends',
                          message: 'Welcome to',
                          user : req.decoded._doc.username,
                          key : keyword,
                          finds : matches
                      });
  });

};

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
