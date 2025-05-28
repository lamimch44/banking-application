//external inputs
const {check, validationResult} = require('express-validator')

//do validation
const dorequestMValidation = [
   check('email')
   .isEmail()
   .withMessage("Invalid Email address!"),
   check('amount')
   .trim()
   .isLength({
    min: 1
   })
   .isNumeric()
   .withMessage('Amount is required')
]

function requestMoneyValidation(req, res, next){
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors) == 0){
        next()
    }else{
        res.render('request-money', {
            data: {
                email: req.body.email
            },
            errors: mappedErrors
        })
    }
}

module.exports = {dorequestMValidation,requestMoneyValidation}