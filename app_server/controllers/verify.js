var User = require('../models/users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config.js');
var passport = require('passport');
var stringify = require('json-stringify-safe');


 var getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

var verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['auth'];
    //console.log(req.cookies);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
              //  console.log(req);
                var err = new Error(stringify(req));
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log("decoded");
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

 var verifyAdmin = function(req, res, next){

    console.log(req.decoded);
    if(req.decoded._doc.admin){
        //console.log("in req.decode.doc.admin");
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
