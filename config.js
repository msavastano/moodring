var express = require('express');
var app = express();

module.exports = {
    'secretKey': getSecretKey() ,
    'mongoUrl' : 'mongodb://localhost:27017/moodring',
}

function getSecretKey() {
  if (app.get('env') === 'development') {
    return '12345-67890-09876-54334'
  }else{
    return process.env.SECRET_KEY;
 }
};

/*
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

crypto.randomBytes(256, function(ex, buf) {
  if (ex) throw ex;
  var token = jwt.sign({foo: 'bar'}, buf);
  var decoded = jwt.verify(token, buf);
});

'facebook': {
    clientID: '1677631512487156',
    clientSecret: '9be36079f185955082f47705593237ac',
    callbackURL: 'https://localhost:3443/users/facebook/callback'
}
*/
