//import mongoose
const mongoose = require('mongoose')

//transaction Schema
const tranSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    transactionid: {
        type: String,
        required: true
    },
    sendername: {
        type: String,
        default: 'null'
    },
    agentname: {
        type: String,
        default: 'null'
    },
    receivername: {
        type: String,
        default: 'null'
    },
    senderid: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    trantype: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: 'null'
    }
})

//make the model
const Transaction = mongoose.model('Transaction', tranSchema)


module.exports = Transaction