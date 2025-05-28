//external inputs
const jwt = require('jsonwebtoken')

//checkLogin function
function checkLogin(req, res, next){
    res.locals.data = {};
    res.locals.errors = {};
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
       
    if(cookies){
        let token = cookies[process.env.COOKIE_NAME]
        if(token){
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            if(decoded){
              res.locals.loggedInUser = decoded
               next();
            }else{
                 res.redirect('/')
            }
            
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
}

//redirectLoggedIn function
function redirectLoggedIn(req, res, next){
    res.locals.data = {};
    res.locals.errors = {};
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if(cookies){
        let token = cookies[process.env.COOKIE_NAME]
        if(token){
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            if(decoded){
           res.locals.loggedInUser = decoded
           res.redirect('/dashboard')
            }else{
                next();
            }

        }else{
            next();
        }
    }else{
        next();
    }
    
}

module.exports = {checkLogin, redirectLoggedIn}