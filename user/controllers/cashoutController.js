//internal inputs
const Agent = require('../models/agent')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const transactionID = require('../utilities/transactionID')

//cashout function
function cashout(req, res, next){
    res.render('cashout')
}

async function cashoutRequest(req, res, next){
     const findAgent = await Agent.findOne({email: req.body.email})
     const findUser = await User.findOne({email: res.locals.loggedInUser.email})
     const addPercentage = Number(req.body.amount) * 2 / 100;
     const finalAmount = Number(req.body.amount) + Number(addPercentage);

     if(findAgent){
          if(req.body.amount > 499){
               if(finalAmount > findUser.balance){
                   res.render('cashout', {
                 data: {
                    email: req.body.email,
                 },
                errors: {
                    amount: {
                      msg: 'Insufficient balance to cashout!'
                  }
               }
            })
        }else{
            const Useramount = Number(findUser.balance) - Number(finalAmount)
            const Agentbalance = Number(findAgent.balance) + Number(req.body.amount)

            const updateUser = await User.updateOne({email: findUser.email}, {balance: Useramount})
            const updateAgent = await Agent.updateOne({email: findAgent.email}, {balance: Agentbalance})
           
                   const generateTID = transactionID(10)
            
                         const transactionOb = Transaction({
                            amount: req.body.amount,
                            receiver: findAgent.email,
                            sender: findUser.email,
                            transactionid: generateTID,
                            agentname: findAgent.storename,
                            sendername: findUser.fullname,
                            senderid: findUser._id,
                            trantype: 'cash'
                         })
            
                         await transactionOb.save();
            
                         const successObject = {
                            user: findUser.email,
                            agent: findAgent.email,
                            transactionid: generateTID,
                            amount: req.body.amount,
                            charge: addPercentage
                         }
                         res.render('cashout-success', {
                             data: successObject
                         })
        }
          }else{
         res.render('cashout', {
            data: {
                email: req.body.email,
            },
            errors: {
                amount: {
                    msg: 'The minimum amount you can cashout is 500 TK'
                }
            }
        })
          }
     }else{
        res.render('cashout', {
            data: {
                email: req.body.email,
            },
            errors: {
                email: {
                    msg: 'Agent not found with this email'
                }
            }
        })
     }
}

module.exports = {cashout, cashoutRequest}