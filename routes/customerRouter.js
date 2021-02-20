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

module.exports = router;
