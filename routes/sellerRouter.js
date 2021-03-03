var express = require("express");
const bodyParser = require("body-parser");
const SellerController = require("../controllers/SellerController");
var router = express.Router();
const verifyJWT = require("../middleware/Authentication")

router.use(bodyParser.json());

router.post("/overview",verifyJWT, SellerController.getOverviewAction);


module.exports = router;
