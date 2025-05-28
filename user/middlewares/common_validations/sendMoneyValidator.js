//external inputs
const {check, validationResult} = require('express-validator')

//do validation
const doValidation = [
   check('email')
   .isEmail()
   .withMessage("Invalid Email address!"),
   check('amount')
   .trim()
   .isLength({
    min: 1
   })
   .withMessage('Amount is required')
]

function sendMoneyValidation(req, res, next){
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors) == 0){
        next()
    }else{
        res.render('send', {
            data: {
                email: req.body.email
            },
            errors: mappedErrors
        })
    }
}

module.exports = {doValidation,sendMoneyValidation}