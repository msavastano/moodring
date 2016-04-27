var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    pic: {
      type: String,
      'default': ''
    },
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      'default': ''
    },
    lastname: {
      type: String,
      'default': ''
    },
    email: {
      type: String,
      'default': ''
    },
    admin:   {
        type: Boolean,
        'default': false
    },
    moods:
      [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Moods'}]
    ,
    friends:
      [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}]
},{
    timestamps: true
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);
var Users = mongoose.model('User', User, 'users');
module.exports = Users;
