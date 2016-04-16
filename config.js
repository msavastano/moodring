module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/moodring',
    'facebook': {
        clientID: '1677631512487156',
        clientSecret: '9be36079f185955082f47705593237ac',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}

/*
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

crypto.randomBytes(256, function(ex, buf) {
  if (ex) throw ex;
  var token = jwt.sign({foo: 'bar'}, buf);
  var decoded = jwt.verify(token, buf);
});
*/
