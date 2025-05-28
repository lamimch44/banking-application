//external inputs
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//internal inputs
const User = require('../models/user')

function signupController(req, res, next){
    res.render('signup')
}


async function signupUser(req, res, next){
    try{
  const findUserbyEmail = await User.findOne({email: req.body.email})
    if(findUserbyEmail){
         res.render('signup', {
            data: {
                name: req.body.fullname,
                email: req.body.email
             },
            errors: {
                email:{
                   msg: 'This email is already exist!'
                }
            }
         })
    }else{
        const hashedpassword = await bcrypt.hash(req.body.password, 13)
        const users = User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedpassword
        })
        await users.save()
        .then((data) => {
            //prepare the token object
            const userObject = {
                id: data._id,
                fullname: data.fullname,
                email: data.email,
                role: data.role
            }
            //generate the token
            const generateToken = jwt.sign(userObject, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY
            })
    
            //set cookie
            res.cookie(process.env.COOKIE_NAME, generateToken, {
                maxAge: 86400,
                signed: true,
                httpOnly: true
            })
            //set the object to local variable
            res.locals.loggedInUser = userObject 
              res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err)
            res.render('signup', {
                data: {
                   name: req.body.name,
                   email: req.body.email
                },
                errors: {
                    common: {
                        msg: err.message
                    }
                }
            })
        })
    
    }
   
}catch(err){
    res.render('signup', {
        data: {
           name: req.body.name,
           email: req.body.email
        },
        errors: {
            common: {
                msg: err.message
            }
        }
    })
}
}
module.exports = {signupController, signupUser}