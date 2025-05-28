//internal inpurs
const RequestM = require('../models/request-money')
const requestID = require('../utilities/transactionID')
const Agent = require('../models/agent')

//requset money page controller 
function RequestMoney(req, res, next){
    res.render('request-money')
}

//Request handler of request money
async function sendRequestMoney(req, res, next){
    const findAgent = await Agent.findOne({email: req.body.email})
    if(findAgent){
   const genRID = requestID(10);
   const saveRM = RequestM({
     user: res.locals.loggedInUser.email,
     agent: req.body.email,
     amount: req.body.amount,
     requestid: genRID,
     note: req.body.note

   })

  await saveRM.save()
  .then((data) => {
     res.render('rm-success', {
        data: data
     })
  })
  .catch((err) => {
     res.render('request-money', {
            errors: {
                email: {
                    msg: 'errr'
                }
            },
            data: {
                email: req.body.email
            }
        })
        console.log(err)
    
  })


    }else{
        res.render('request-money', {
            errors: {
                email: {
                    msg: 'Agent not found with this email!'
                }
            },
            
               data: {
                email: req.body.email
            }
        })
    }

}

module.exports = {RequestMoney, sendRequestMoney}