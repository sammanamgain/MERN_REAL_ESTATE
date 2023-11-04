const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,

        required: true
    },
    avator: { type: String, default: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg" }
    , timestamp: { type: Date, require: true, default: Date.now() }
}
);
const User = mongoose.model('User', userschema);
module.exports = User;