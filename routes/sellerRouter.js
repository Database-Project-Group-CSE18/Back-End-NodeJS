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

router.post("/productstatistics", SellerController.getProductStatisticsAction);
router.get("/categorystatistics", SellerController.getCategoryStatisticsAction);

/**################################################################
            Routes for get/put seller details to the DB
 ################################################################# */
 
 router.route("/changeSellerDetails")
router.route("/changeSellerDetails")
    .put(SellerController.insertsellerdata)
    .get(SellerController.getsellerdata)

/**################################################################
            Router for put new password to the DB
 ################################################################# */
 
 router.route("/changeSellerPassword")
    .put(SellerController.changePassword)

   
router.route("/chartforspecificproduct")
.get(SellerController.ChartForSpecificProduct) 

module.exports = router;
