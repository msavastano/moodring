var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');


module.exports.addFriend =  function(req, res, next) {
  User.findById(req['decoded']['_doc']['_id'], function(err, user){

    if(user.friends.indexOf(req.params.friendid) == -1){
      if(err) throw err
      console.log(req.params.friendid);
      user.friends.push(req.params.friendid);
      user.save(function(err,user) {
        res.redirect('/friend/'+req.params.friendid);
      });
    }else{
      res.redirect('/friend/'+req.params.friendid);
    }
  });

};

// Friend Page
module.exports.index = function(req, res, next) {
  User.findById(req.params.friendid, function(err, friend){
    if (err) throw err
    var fmoods = friend.moods;
    var cm;
    /*if(umoods.length == 0){
      res.render('pick_first_mood', { title: 'My Page',
                            message: 'Welcome to',
                            moodMap: moodMap.moods,
                            fr : friend,
                            user : req.decoded._doc.username
                        });
    }else{*/
    fmoods.forEach(function(m, i){
      Moods.findById(m, function(err, md){
        if(md.latestMood == true){
          cm = md;
          console.log(cm);
          res.render('friend', { title: '\'s Page',
                                message: 'Welcome to',
                                moodMap: moodMap.moods,
                                user : req.decoded._doc.username,
                                fr : friend,
                                lastestFrMood : cm
                            });

        }
      });

    });
  //}
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
