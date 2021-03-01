const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const { deleteBankCard } = require('../models/userModel');


orderRouter.route('/').get(orderController.getAllOrdersAction)
  .post(orderController.searchOrdersInOrderlist);

orderRouter.route("/awaitingshipments")
   .get(orderController.getAwaitingShipmentsAction)

orderRouter.route("/awaitingdeliveries")
  .get(orderController.getAwaitingDeliveriesAction);

orderRouter.route("/returns")
  .get(orderController.getReturnsAction)

orderRouter.route("/cancellations")
  .get(orderController.getCancellationsAction);

orderRouter.route("/delivered")
  .get(orderController.getReceivedAction);

module.exports = orderRouter;


