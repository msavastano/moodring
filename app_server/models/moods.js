var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        'default':true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

moodSchema.methods.getName = function() {
    return (this.label);
};

var Moods = mongoose.model('Moods', moodSchema, 'moods');

module.exports = Moods;
