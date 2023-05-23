const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [8, "Your password must be at least 8 characters long"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema)