const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const { deleteBankCard } = require('../models/userModel');


/*orderRouter.route('/').get(OrderController.getAllOrdersAction)
.post(OrderController.searchOrdersInOrderlist);

orderRouter.route("/categories")
   .get(orderController.getAwaitingPayment)

orderRouter.route("/search/:category")
  .get(orderController.getgetAwaitingDeliveries);

orderRouter.route("/specificitem/:Item_id")
  .get(orderController.getAwaiting)

orderRouter.route("/specificitem/replys/:Fb_id")
  .get(orderController.getItemByIDAction);

orderRouter.route("/specificitem/addtocart")
  .post(orderController.addToCartAction);

module.exports = orderRouter;*/


