var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var commentsOnCommentsSchema = new Schema({
    commentOnComment:  {
        type: String,
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
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[commentsOnCommentsSchema]
}, {
    timestamps: true
});


var moodSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String, 
		default: '',
        required: false
    },
    colorCSS: {
        type: String,
        required: true
    },    
    latestMood:{
        type: Boolean
        required:true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

moodSchema.methods.getName = function() {
    return (this.label);
};

moodSchema.plugin(passportLocalMongoose);

var Moods = mongoose.model('Moods', moodSchema);

module.exports = Moods;


