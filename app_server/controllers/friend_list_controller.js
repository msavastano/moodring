// Friend Page
module.exports.index = function(req, res, next) {
  res.render('friend_list', { title: 'Friends List',
                        message: 'Welcome to'});
};

module.exports.new_comment = function(req, res, next){
    
};