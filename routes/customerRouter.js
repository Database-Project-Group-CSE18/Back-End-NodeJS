var express = require("express");
const bodyParser = require("body-parser");
const customerController = require("../controllers/customerController");
var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//address routes
router.get('/addresses',customerController.getAddressesAction)
router.post('/addresses',customerController.insertAddressAction)
router.delete('/addresses',customerController.deleteAddressAction)

//bank card routes
router.get('/bankCards',customerController.getBankCardsAction)
router.post('/bankCards',customerController.insertBankCardsAction)
router.delete('/bankCards',customerController.deleteBankCardAction)

//user routes
router.post("/register", customerController.registerAction);

router.get("/user",customerController.getUserDetails)
router.put("/user",customerController.updateUserDetailsAction)
router.put("/userpwd",customerController.updatePasswordAction)
router.get("/userpwd",customerController.getPwdAction)

module.exports = router;
