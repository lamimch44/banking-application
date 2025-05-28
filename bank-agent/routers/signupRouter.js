//external inputs
const router = require('express').Router()
//internal inputs
const {signupController, signupUser} = require('../controllers/signupController')
const {doValidation, signupValidator} = require('../middlewares/signup/signupValidator')
const {redirectLoggedIn} = require('../middlewares/common/checkLogin')
//Routing
router.get('/', redirectLoggedIn, signupController)
router.post('/', doValidation, signupValidator, signupUser)

module.exports = router