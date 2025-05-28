//external inputs
const router = require('express').Router()

//internal inputs
const {loginController, verifyLogin, logout} = require('../controllers/loginController')
const {redirectLoggedIn, checkLogin} = require('../middlewares/common/checkLogin')

//Routing
router.get('/',redirectLoggedIn, loginController)

router.post('/', redirectLoggedIn, verifyLogin)

router.delete('/logout', logout)


module.exports = router