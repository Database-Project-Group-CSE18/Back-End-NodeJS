var express = require("express");
const bodyParser = require("body-parser");
const customerController = require("../controllers/customerController");
var router = express.Router();

router.use(bodyParser.json());

router.post("/register", customerController.registerAction);

module.exports = router;
