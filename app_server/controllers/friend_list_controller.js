// Friend Page
module.exports.index = function(req, res, next) {
  res.render('friend_list', { title: 'Friends List',
                              message: 'Welcome to',
                              friendsmap: data.friends
                            });
};


var data = {
  friends : [{
    username : 'BobbyJoe',
    mood : '#1db715',
    _id:1
  },
  {
    username : 'SallieJane',
    mood : '#15acb7',
    _id:2
  },
  {
    username : 'BillieBob',
    mood : '#cd1b18',
    _id:3
  }]
};
