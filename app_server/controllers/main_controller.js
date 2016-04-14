var Moods = require('../models/moods');

// Homepage
module.exports.index = function(req, res, next) {
  res.render('index', { title: 'My Page',
                        message: 'Welcome to',
                        moodMap: moodMap.moods
                    });
};

module.exports.new_mood = function(req, res, next){
  Moods.create(req.body, function (err, mood) {
        if (err) throw err;
        console.log('Mood created!');
        var id = mood._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the mood with id: ' + id);
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
