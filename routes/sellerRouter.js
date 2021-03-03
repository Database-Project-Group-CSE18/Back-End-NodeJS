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
 
sellerRouter.route("/changeSellerDetails")
    .put(sellerController.insertsellerdata)
    .get(sellerController.getsellerdata)

/**################################################################
            Router for put new password to the DB
 ################################################################# */
 
sellerRouter.route("/changeSellerPassword")
    .put(sellerController.changePassword)

module.exports = router;
