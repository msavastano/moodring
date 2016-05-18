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
    return process.env.JWT_SECRET;
 }
};
