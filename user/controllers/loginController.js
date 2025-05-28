//internal inputs
const User = require('../models/user')
//external inputs
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//login controller function
function loginController(req, res, next){
    res.render('index')
}

//Verify login function
async function verifyLogin(req, res, next){
     try{
        const findUser = await User.findOne({
            email: req.body.email
        })

        if(findUser){
            const comparePassword = await bcrypt.compare(req.body.password, findUser.password)
            if(comparePassword){
                const userObject = {
                id: findUser._id,
                fullname: findUser.fullname,
                email: findUser.email,
                role: findUser.role
            }
                const generatetoken = jwt.sign(userObject, process.env.JWT_SECRET, {
                     expiresIn: process.env.JWT_EXPIRY
                })
                //set cookies
                res.cookie(process.env.COOKIE_NAME, generatetoken, {
                    maxAge: 86400,
                    httpOnly: true,
                    signed: true
                })
                   res.redirect('/dashboard')
            }else{
         res.render('index', {
            data: {
                email: req.body.email
            },
            errors: {
                password: {
                    msg: 'Incorrect Password!'
                }
            }
           })
            }
        }else{
           res.render('index', {
            data: {
                email: req.body.email
            },
            errors: {
                email:{
                    msg: 'User not found with this email address'
                } 
            }
           })
        }
     }catch(err){
        res.render('index', {
            data: {
                email: req.body.email
            },
            errors: {
                email: {
                    msg: err.message
                } 
            }
        })
     }
}

//logout function
function logout(req, res, next){
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('Logged out')
}

module.exports = {loginController, verifyLogin, logout}