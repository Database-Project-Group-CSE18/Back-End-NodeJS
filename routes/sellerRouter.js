var express = require('express');
var sellerRouter = express.Router();
const sellerController = require('../controllers/sellerController');


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

sellerRouter.route("/chartforspecificproduct")
    .get(sellerController.ChartForSpecificProduct)
    
module.exports = sellerRouter;
