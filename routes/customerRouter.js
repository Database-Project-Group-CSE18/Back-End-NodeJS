var express = require("express");
const bodyParser = require("body-parser");
const customerController = require("../controllers/customerController");
const verifyJWT = require("../middleware/Authentication")

var router = express.Router();

router.use(bodyParser.json());

router.post("/register",verifyJWT, customerController.registerAction);
router.post("/login", customerController.loginAction);
router.get("/login",  customerController.checkLoginAction);
router.get("/isUserAuth", customerController.checkAuth);


//address routes
router.get('/addresses',customerController.getAddressesAction)
router.post('/addresses',customerController.insertAddressAction)
router.delete('/addresses',customerController.deleteAddressAction)

//bank card routes
router.get('/bankCards',customerController.getBankCardsAction)
router.post('/bankCards',customerController.insertBankCardsAction)
router.delete('/bankCards',customerController.deleteBankCardAction)


// user routes
router.get("/user",customerController.getUserDetails)
router.put("/user",customerController.updateUserDetailsAction)
router.put("/userpwd",customerController.updatePasswordAction)
router.get("/userpwd",customerController.getPwdAction)


//order routes
router.get("/allorders",customerController.getAllOrdersAction)
router.get("/allorders/stats",customerController.getOrderStatsAction)
router.put("/allorders",customerController.updateOrderStatusAction)


module.exports = router;
