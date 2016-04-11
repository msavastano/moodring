// Friend Page
module.exports.index = function(req, res, next) {
  res.render('friend', { title: 'Friend\'s Page',
                        message: 'Welcome to'});
};
