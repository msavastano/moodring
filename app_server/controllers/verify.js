var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var passport = require('passport');
var stringify = require('json-stringify-safe');

 var getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 84300 // one day
    });
};

// Verify and decode the token
var verifyOrdinaryUser = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['auth'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
              var err = new Error("Not logged in!");
              err.status = 401;
              res.redirect('/users/login');
            } else {
                
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        res.redirect('/users/login');
    }
};

var refreshToken = function(req, res){
  var token = getToken(user);
  res.cookie('auth',token);
};

// Use later
var verifyAdmin = function(req, res, next){
  console.log(req.decoded);
  if(req.decoded._doc.admin){
      next();
  }else{
      var err = new Error('You are not an admin!');
      next(err);
  }
};

module.exports = {
   verifyOrdinaryUser : verifyOrdinaryUser ,
    verifyAdmin : verifyAdmin,
    getToken:getToken
}
