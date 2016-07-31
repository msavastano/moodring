var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');
var moodmapper = require('./moodmapper');
var cloudinary = require('cloudinary');


module.exports.get_image_page = function(req, res, next) {
  res.render('image', {
  });
};

/*module.exports.image_upload = function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    console.log(user);
    console.log(req.file.path);
    user.pic = req.file.path;
    user.save(function(err, user){
      res.redirect('/');
    });
    //res.redirect('/');
  });
};*/

module.exports.image_cl_upload = function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    var stream = cloudinary.uploader.upload(req.file.path, function(result) {
      console.log(result);
      user.pic = result.url;
      user.save(function(err, user){
        res.redirect('/');
      });
    });
  });
};




// User Homepage
module.exports.index = function(req, res, next) {

  User.findById(req['decoded']['_doc']['_id'], function(err, user){
    if (err) throw err
    var umoods = user.moods;
    var cm;
    console.log("pic = "+user.pic);
    var upic = user.pic;
    if(user.pic === ''){
      upic = 'http://res.cloudinary.com/hc8sjgb90/image/upload/v1469932937/ddgx83q76t8fqcdwhssg.jpg';
    }
    if(umoods.length == 0){
      // render a screen for picking first mood
      res.render('pick_first_mood', { title: 'My mood',
                            message: 'Welcome to',
                            moodMap: moodmapper.moodMap.moods,
                            userid : req.decoded._doc._id,
                            user : user.username,
                            nouser:req.decoded,
                            userpic:upic
                        });
    }else{
      //console.log(moodmapper.moodMap.moods);
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
                                  moodMap: moodmapper.moodMap.moods,
                                  user : req.decoded._doc.username,
                                  userid : req.decoded._doc._id,
                                  currMood : cm,
                                  nouser:req.decoded,
                                  userpic:upic
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
                          moodMap: moodmapper.moodMap.moods,
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
                              moodMap: moodmapper.moodMap.moods,
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
                        moodMap:moodmapper.moodMap.moods,
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
