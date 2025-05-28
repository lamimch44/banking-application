//external inputs
const Transaction = require('../models/transaction')

//transaction home route
async function transactionHome(req, res, next){
    const findTransactions = await Transaction.find({
        $or:[{sender: res.locals.loggedInUser.email}, {receiver: res.locals.loggedInUser.email}]
    }).sort('-date')



    res.render('transactions', {
        data: findTransactions
    })

}

module.exports = {transactionHome}