//external inputs
const mongoose = require('mongoose')

const RequestMoneySchema = mongoose.Schema({
     user: {
        type: String,
        required: true
     },
     agent: {
        type: String,
        required: true
     },
     requestid: {
        type: String,
        required: true
     },
     amount: {
        type: Number,
        required: true
     },
     note: {
        type: String,
        default: 'null'
     },
     status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending'
     }
},
{
   timestamps: true
}
);

const RequestM = mongoose.model('RequestMoney', RequestMoneySchema)

module.exports = RequestM