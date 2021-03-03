const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
// const { deleteBankCard } = require('../model/customerModel');

/*Feedback routes*/

orderRouter.route("/feedback")
   .post(orderController.insertFeedbackAction);

/* Place an order. */
orderRouter.route("/placeorder")
   .post(orderController.placeOrderAction);

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

// /* GET items listing. */
orderRouter.route('/orderdetails/:order_id')
   .get(orderController.getOrderDetailsAction);

orderRouter.route("/delivered")
  .get(orderController.getReceivedAction);

orderRouter.route("/markasshipped")
  .post(orderController.MarkAsShipped);

module.exports = orderRouter;


