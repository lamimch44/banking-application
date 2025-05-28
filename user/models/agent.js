//external inputs
const mongoose = require('mongoose')

//Schema
const agentSchema = mongoose.Schema({
    storename: {
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
        default: 'agent'
    }
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent