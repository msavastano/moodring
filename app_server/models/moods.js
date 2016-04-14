var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var commentsOnCommentsSchema = new Schema({
    commentOnComment:  {
        type: String,
        maxlength: 144,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var commentSchema = new Schema({
    comment:  {
        type: String,
        maxlength: 144,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentsOnComments:[commentsOnCommentsSchema]
}, {
    timestamps: true
});


var moodSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    latestMood:{
        type: Boolean,
        required:true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

moodSchema.methods.getName = function() {
    return (this.label);
};

//moodSchema.plugin(passportLocalMongoose);

var Moods = mongoose.model('Moods', moodSchema, 'moods');

module.exports = Moods;
