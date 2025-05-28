//internal inputs
const RequestM = require('../models/request-money');
const Agent = require('../models/agent')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const transactionID = require('../utilities/transactionID')

//Money request Page
async function moneyRequest(req, res, next){
    const findRM = await RequestM.find({agent: res.locals.loggedInUser.email})

    res.render('money-request', {
        requests: findRM
    })
}

async function approveRequest(req, res, next) {
     const findUser = await User.findOne({email: req.body.user})
     const findRequest = await RequestM.findOne({requestid: req.body.requestId})
     const findAgent = await Agent.findOne({email: res.locals.loggedInUser.email})

          if(findRequest.amount > findAgent.balance){
              res.status(400).json({
                code: 372,
                message: 'Insufficient fund!'
              })
          }else{
               let minusSender = findAgent.balance - findRequest.amount
               let plusReceiver = Number(findUser.balance) + Number(findRequest.amount)

              const updateSender = await Agent.updateOne({email: findAgent.email}, {balance: minusSender})
             const updateReceiver =  await User.updateOne({email: findUser.email}, {balance: plusReceiver})
             const updateRMstatus =  await RequestM.updateOne({requestid: req.body.requestId}, {status: 'approved'})
             const generateTID = transactionID(10)
             const notes = req.body.note ? req.body.note : 'null';

             const transactionOb = Transaction({
                amount: findRequest.amount,
                receiver: findUser.email,
                sender: findAgent.email,
                transactionid: generateTID,
                agentname: findAgent.storename,
                receivername: findUser.fullname,
                senderid: findAgent._id,
                trantype: 'cash',
                note: notes
             })

             await transactionOb.save();

             res.status(200).json({
                code: 200,
                message: 'Money Request Approved!'
             })
  
         }
       
     }

     async function rejectRequest(req, res, next) {
             await RequestM.updateOne({requestid: req.body.requestId}, {status: 'rejected'})
             .then(() => {
                res.status(200).json({
                    code: 200,
                    message: 'Requested rejected'
                })
             })
             .catch((err) => {
                res.status(500).json({
                    code: 372,
                    message: `Error: ${err.message}`
                })
             })

     }


module.exports = {moneyRequest, approveRequest, rejectRequest}