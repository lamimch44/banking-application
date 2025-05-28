//external inputs
const router = require('express').Router()
const multer = require('multer')
const upload = multer();
//internal inputs
const {checkLogin} = require('../middlewares/common/checkLogin')
const { dashboardController, addMoney, addMoneyUser, transactionHome } = require('../controllers/applicationController')
const { docashinValidation, cashInValidation } = require('../middlewares/common_validations/cashinvalidator')
const { moneyRequest, approveRequest, rejectRequest } = require('../controllers/moneyRequestController');
const { sendMoneyV, sendMoney } = require('../controllers/sendMoneyController');
const { doValidation, sendMoneyValidation } = require('../middlewares/common_validations/sendMoneyValidator');

//dashboard Routing
router.get('/',checkLogin, dashboardController)

//addMoney Routing
router.get('/add-money', checkLogin, addMoney)

//addMoney to User
router.post('/add-money', checkLogin, docashinValidation, cashInValidation, addMoneyUser)

//Request Money from User
router.get('/money-request', checkLogin, moneyRequest)

//Approve Money Request
router.post('/money-request/approve-request', checkLogin, upload.none(), approveRequest)

//Transaction Route
router.get('/transactions', checkLogin, transactionHome)

//Sendmoney Route
router.get('/send-money', checkLogin, sendMoney)

//Sendmoney request post route
router.post('/send-money', checkLogin, doValidation, sendMoneyValidation, sendMoneyV)

//Reject money request
router.post('/money-request/reject-request', checkLogin, upload.none(), rejectRequest)

module.exports = router