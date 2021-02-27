var express = require("express");
const bodyParser = require("body-parser");
const customerController = require("../controllers/customerController");
const verifyJWT = require("../middleware/Authentication")

var router = express.Router();

router.use(bodyParser.json());

router.post("/register", customerController.registerAction);
router.post("/login", customerController.loginAction);
router.get("/login",  customerController.checkLoginAction);
// router.get("/isUserAuth", customerController.checkAuth);


//address routes
router.get('/addresses',customerController.getAddressesAction)
router.post('/addresses',customerController.insertAddressAction)
router.delete('/addresses',customerController.deleteAddressAction)

//bank card routes
router.get('/bankCards',customerController.getBankCardsAction)
router.post('/bankCards',customerController.insertBankCardsAction)
router.delete('/bankCards',customerController.deleteBankCardAction)



router.get("/user",customerController.getUserDetails)
router.put("/user",customerController.updateUserDetailsAction)
router.put("/userpwd",customerController.updatePasswordAction)
router.get("/userpwd",customerController.getPwdAction)

module.exports = router;
