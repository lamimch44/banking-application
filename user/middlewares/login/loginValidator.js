//external inputs
const {check, validationResult} = require('express-validator')

//do validation
const doValidation = [
    check('email')
    .isEmail()
    .withMessage('Invalid Email Address!'),
    check('password')
    .isLength({
        min: 1
    })
    .withMessage('Password is required!')
]

function loginValidator(req, res, next){
    const errors = validationResult(req)

    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length == 0){
        next()
    }else{
       res.render('index', {
        data: {
            email: req.body.email,
            name: req.body.fullname
        },
         errors: mappedErrors
       })
    }
}

module.exports = {doValidation, loginValidator};