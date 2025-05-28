//external inputs
const { check, validationResult } = require('express-validator')

//do validation
const doValidation = [
    check('storename')
    .trim()
    .isLength({
        min: 1
    })
    .withMessage('Store name is required!'),
    check('email')
    .isEmail()
    .withMessage('Invalid Email Address!'),
    check('password')
    .isLength({
        min: 1
    })
    .withMessage('Password is required!')
]

function signupValidator(req, res, next){
    const errors = validationResult(req)

    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0){
        res.locals.data = {}
        res.locals.errors = {}
        next()
    }else{
       res.render('signup', {
        data: {
            email: req.body.email,
            storename: req.body.storename
        },
         errors: mappedErrors
       })
    }
}

module.exports = { doValidation, signupValidator};