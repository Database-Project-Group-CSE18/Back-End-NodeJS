var express = require("express");
const bodyParser = require("body-parser");
const SellerController = require("../controllers/SellerController");
var router = express.Router();
const verifyJWT = require("../middleware/Authentication")

router.use(bodyParser.json());


/**################################################################
                          Customer Model
 ################################################################# */

router.post("/overview",verifyJWT, SellerController.getOverviewAction);


/**################################################################
            Routes for get/put seller details to the DB
 ################################################################# */
 
router.route("/changeSellerDetails")
    .put(SellerController.insertsellerdata)
    .get(SellerController.getsellerdata)

/**################################################################
            Router for put new password to the DB
 ################################################################# */
 
router.route("/changeSellerPassword")
    .put(SellerController.changePassword)

module.exports = router;