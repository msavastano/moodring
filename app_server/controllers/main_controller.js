var Moods = require('../models/moods');
var Verify = require('./verify');
var User = require('../models/users');
var stringify = require('json-stringify-safe');
var Verify    = require('./verify');

// Homepage
module.exports.index = function(req, res, next) {
  res.render('index', { title: 'My Page',
                        message: 'Welcome to',
                        moodMap: moodMap.moods,
                        request_userid : req['decoded']['_doc']['_id'],
                        response_userid : res.req.decoded._doc._id,
                        req : stringify(req),
                        res : stringify(res)
                    });
};

module.exports.addMoodToUser = function(req, res, next){

};

module.exports.new_mood = function(req, res, next){
  //console.log(stringify(req.body));

  if(req.decoded._doc._id){
    User
      .findById(req.decoded._doc._id, function(err, user){
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          Moods.create(req.body, function (err, mood) {
            console.log("Request Body "+stringify(req.body));
            if (err) throw err;

            mood.label = req.body.label;
            user.moods.push(mood._id);
            user.save(function(err, user){
              console.log('Updated');
              //res.json(mood.label);
              //next();
              //sendJSONresponse(res, 200, mood);
              res.render('index', {
                title: 'My Page',
                message: 'Welcome to',
                moodMap: moodMap.moods,
                user : res.req.decoded._doc.username
              });
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
