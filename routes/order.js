const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
// const { deleteBankCard } = require('../model/customerModel');
const { deleteBankCard } = require('../models/userModel');

/*Feedback routes*/

orderRouter.route("/feedback")
   .post(orderController.insertFeedbackAction);

/* Place an order. */
orderRouter.route("/placeorder")
   .post(orderController.placeOrderAction);


/* GET items listing. */
orderRouter.route('/').get();

/* GET items listing. */
orderRouter.route('/orderdetails/:order_id').
    get(orderController.getOrderDetailsAction);


module.exports = orderRouter;


