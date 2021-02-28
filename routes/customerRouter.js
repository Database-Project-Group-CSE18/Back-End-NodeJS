var express = require("express");
const bodyParser = require("body-parser");
const customerController = require("../controllers/customerController");
const verifyJWT = require("../middleware/Authentication")
var router = express.Router();

router.use(bodyParser.json());
/**################################################################
                          Customer Model
 ################################################################# */
router.post("/register", customerController.registerAction);
router.post("/login", customerController.loginAction);
router.get("/logout",  customerController.logoutAction);
router.get("/login",  customerController.checkLoginAction);

router.get("/user",customerController.getUserDetails)
router.put("/user",customerController.updateUserDetailsAction)
router.put("/userpwd",customerController.updatePasswordAction)
router.get("/userpwd",customerController.getPwdAction)

/**################################################################
                          Address Model
 ################################################################# */
router.get('/addresses',customerController.getAddressesAction)
router.post('/addresses',customerController.insertAddressAction)
router.delete('/addresses',customerController.deleteAddressAction)

/**################################################################
                          Bank Card Model
 ################################################################# */
router.get('/bankCards',customerController.getBankCardsAction)
router.post('/bankCards',customerController.insertBankCardsAction)
router.delete('/bankCards',customerController.deleteBankCardAction)

module.exports = router;
