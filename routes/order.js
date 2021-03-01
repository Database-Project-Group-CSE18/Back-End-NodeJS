const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
// const { deleteBankCard } = require('../model/customerModel');
const { deleteBankCard } = require('../models/userModel');

/*Feedback routes*/

orderRouter.route("/feedback")
   .post(orderController.insertFeedbackAction);

/* GET items listing. */
orderRouter.route('/').get();


module.exports = orderRouter;


