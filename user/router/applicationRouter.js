//external inputs
const router = require('express').Router()

//internal inputs
const {dashboardController} = require('../controllers/applicationController')
const {cashout, cashoutRequest} = require('../controllers/cashoutController')
const { RequestMoney, sendRequestMoney } = require('../controllers/request-moneyController')
const {sendMoney, sendMoneyV} = require('../controllers/sendMoneyController')
const {transactionHome} = require('../controllers/transactionController')
const {checkLogin} = require('../middlewares/common/checkLogin')
const { docashoutValidation, cashoutValidation } = require('../middlewares/common_validations/cashoutValidator')
const { dorequestMValidation, requestMoneyValidation } = require('../middlewares/common_validations/requestMoneyValidator')
const {sendMoneyValidation, doValidation} = require('../middlewares/common_validations/sendMoneyValidator')

//Dashboard routing
router.get('/', checkLogin, dashboardController)

//Sendmoney Routing
router.get('/sendmoney', checkLogin, sendMoney)

//SendMoney Action
router.post('/sent', checkLogin, doValidation, sendMoneyValidation, sendMoneyV)

//Transaction routing
router.get('/transactions', checkLogin, transactionHome)

//Cashout Routing
router.get('/cashout', checkLogin, cashout)

//Cashout post request

router.post('/cashout', checkLogin, docashoutValidation, cashoutValidation, cashoutRequest)

//Request Money
router.get('/request-money', checkLogin, RequestMoney)

//Send request for request money
router.post('/request-money', checkLogin, dorequestMValidation, requestMoneyValidation, sendRequestMoney)

module.exports = router