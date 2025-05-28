// models input
const User = require('../models/user')
const Transaction = require('../models/transaction')
//transaction Id generator
const transactionID = require('../utilities/transactionID')

//send money controller
function sendMoney(req, res, next){
    res.render('send')
}

async function sendMoneyV(req, res, next){
     const findUser = await User.findOne({email: req.body.email})
     const findSender = await User.findOne({email: res.locals.loggedInUser.email})
     if(findUser){
        if(findUser.email !== findSender.email){
          if(req.body.amount > findSender.balance){
             res.render('send', {
            data: {
                email: req.body.email
            },
            errors: {
                amount: {
                    msg: 'Insufficient balance!'
                }
            }
        })
          }else{
         if(req.body.amount > 19){
               let minusSender = findSender.balance - req.body.amount
               let plusReceiver = Number(findUser.balance) + Number(req.body.amount)

              const updateSender = await User.updateOne({email: findSender.email}, {balance: minusSender})
             const updateReceiver =  await User.updateOne({email: findUser.email}, {balance: plusReceiver})
             const generateTID = transactionID(10)

             const transactionOb = Transaction({
                amount: req.body.amount,
                receiver: findUser.email,
                sender: findSender.email,
                transactionid: generateTID,
                sendername: findSender.fullname,
                receivername: findUser.fullname,
                senderid: findSender._id,
                trantype: 'sendmoney'
             })

             await transactionOb.save();

             const successObject = {
                receiver: findUser.email,
                sender: findSender.email,
                transactionid: generateTID,
                amount: req.body.amount
             }
             res.render('sendmoney-success', {
                 data: successObject
             })
         }else{
             res.render('send', {
            data: {
                email: req.body.email
            },
            errors: {
                amount: {
                    msg: 'The minimum amount you can send is 20 TK'
                }
            }
        })
         }
         }
         }else{
            res.render('send', {
            data: {
                email: req.body.email
            },
            errors: {
                email: {
                    msg: 'You cannot send money to yourself'
                }
            }
        })
         }
     }else{
        res.render('send', {
            data: {
                email: req.body.email
            },
            errors: {
                email: {
                    msg: 'User not found with this email'
                }
            }
        })
     }
}

module.exports = {sendMoney, sendMoneyV}