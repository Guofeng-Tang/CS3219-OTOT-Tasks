var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    screenName: {
        type: String,
        default: "a screen name"
    },
    profilePicSrc: {
        type: String,
        default: "https://imgur.com/I80W1Q0.png",
    },
    age: {
        type: Number,
        default: 0,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
