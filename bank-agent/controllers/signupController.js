//external inputs
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//internal inputs
const Agent = require('../models/agent')

function signupController(req, res, next){
    res.render('signup')
}


async function signupUser(req, res, next){
    try{
  const findAgentbyEmail = await Agent.findOne({email: req.body.email})
    if(findAgentbyEmail){
         res.render('signup', {
            data: {
                storename: req.body.storename,
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
        const agents = Agent({
            storename: req.body.storename,
            email: req.body.email,
            password: hashedpassword,
            role: 'agent'
        })
        await agents.save()
        .then((data) => {
            //prepare the token object
            const userObject = {
                id: data._id,
                storename: data.storename,
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
                   storename: req.body.storename,
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
           storename: req.body.storename,
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