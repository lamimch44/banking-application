//import models
const Agent = require('../models/agent')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const transactionID = require('../utilities/transactionID')

//dashboard function
async function dashboardController(req, res, next){
    const findAgent = await Agent.findOne({email: res.locals.loggedInUser.email})
    const findTransac = await Transaction.find({
        $or: [{sender: findAgent.email}, {receiver: findAgent.email}]
    }).limit(5).sort('-date')
    res.render('dashboard', {
        data: findAgent,
        transacs: findTransac
    })
}

//addMoney function

function addMoney(req, res, next){
    res.render('addmoney')
} 

async function addMoneyUser(req, res, next){
     const findUser = await User.findOne({email: req.body.email})
     const findAgent = await Agent.findOne({email: res.locals.loggedInUser.email})
     if(findUser){
          if(req.body.amount > findAgent.balance){
             res.render('addmoney', {
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
         if(req.body.amount > 499){
               let minusSender = findAgent.balance - req.body.amount
               let plusReceiver = Number(findUser.balance) + Number(req.body.amount)

              const updateSender = await Agent.updateOne({email: findAgent.email}, {balance: minusSender})
             const updateReceiver =  await User.updateOne({email: findUser.email}, {balance: plusReceiver})
             const generateTID = transactionID(10)
             const notes = req.body.note ? req.body.note : 'null';

             const transactionOb = Transaction({
                amount: req.body.amount,
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

             const successObject = {
                user: findUser.email,
                agent: findAgent.email,
                transactionid: generateTID,
                receivername: findUser.fullname,
                amount: req.body.amount
             }
             res.render('addmoney-success', {
                 data: successObject
             })
         }else{
             res.render('addmoney', {
            data: {
                email: req.body.email
            },
            errors: {
                amount: {
                    msg: 'The minimum amount you can cash in is 500 TK'
                }
            }
        })
         }
         }
       
     }else{
        res.render('addmoney', {
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

//transaction home route
async function transactionHome(req, res, next){
    const findTransactions = await Transaction.find({
        $or:[{sender: res.locals.loggedInUser.email}, {receiver: res.locals.loggedInUser.email}]
    }).sort('-date')



    res.render('transactions', {
        data: findTransactions
    })

}

module.exports = {dashboardController, addMoney, addMoneyUser, transactionHome}