module.exports.index = function(req, res, next) {
  res.render('comment', { title: 'New Comment',
                        message: 'Welcome to'});
    
};

module.exports.new_comment = function(req, res, next){
    
};