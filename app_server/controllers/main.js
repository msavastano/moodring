// Homepage
module.exports.index = function(req, res, next) {
  res.render('index', { title: 'Express',
                        message: 'Welcome to'});
};