//external inputs
const mongoose = require('mongoose')

//Schema
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User