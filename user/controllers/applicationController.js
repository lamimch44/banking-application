//input the user model
const User = require('../models/user')

//dashboard controller function
async function dashboardController(req, res, next){
    const userInfo = await User.findOne({email: res.locals.loggedInUser.email})
   
    res.render('dashboard', {
        loggedInUser: userInfo
    })
}


module.exports = {dashboardController}