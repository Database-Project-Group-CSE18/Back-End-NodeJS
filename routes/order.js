const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/ItemController');
const { deleteBankCard } = require('../model/customerModel');

/* GET items listing. */
orderRouter.route('/').get();


module.exports = orderRouter;


